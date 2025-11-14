import { create } from "zustand";

export interface Transaction {
	id: number | undefined;
	name: string;
	amount: number;
	type: "Income" | "Expense";
}

interface TransactionStore {
	transactions: Transaction[];

	setTransactions: (transactions: Transaction[]) => void;

	addTransactionModal: boolean;
	setAddTransactionModal: (value: boolean) => void;
	addTransaction: (transaction: Transaction) => void;

	updateTransactionModal: boolean;
	setUpdateTransactionModal: (value: boolean) => void;
	updateTransaction: (transaction: Transaction) => void;

	deleteTransactionModal: boolean;
	setDeleteTransactionModal: (value: boolean) => void;
	deleteTransaction: (id: number) => void;

	currentTransaction: Transaction | null;
	setCurrentTransaction: (transaction: Transaction | null) => void;

	selectedTransactions: Transaction[];
	setSelectedTransactions: (transaction: Transaction) => void;
	deleteSelectedTransaction: (transaction: Transaction) => void;
	setSelectAndDeselectAllTransactions: (transactions: Transaction[]) => void;

	filteredTransactions: Transaction[];
	setFilteredTransactions: (query?: string) => void;

	setSortedTransactions: (
		key: keyof Transaction | null,
		direction: "asc" | "desc" | null,
	) => void;

	transactionCount: number;
	setTransactionCount: (count: number) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
	transactions: [],

	setTransactions: (newTransactions) =>
		set({ transactions: newTransactions }),

	addTransactionModal: false,
	setAddTransactionModal: (value) => set({ addTransactionModal: value }),

	addTransaction: (transaction) =>
		set((state) => ({
			transactions: [...state.transactions, transaction],
		})),

	updateTransactionModal: false,
	setUpdateTransactionModal: (value) =>
		set({ updateTransactionModal: value }),

	updateTransaction: (updatedTransaction) =>
		set((state) => ({
			transactions: state.transactions.map((t) =>
				t.id === updatedTransaction.id ? updatedTransaction : t,
			),
		})),

	deleteTransactionModal: false,
	setDeleteTransactionModal: (value) =>
		set({ deleteTransactionModal: value }),

	deleteTransaction: (id) =>
		set((state) => ({
			transactions: state.transactions.filter((t) => t.id !== id),
		})),

	currentTransaction: null,
	setCurrentTransaction: (transaction) =>
		set({ currentTransaction: transaction }),

	selectedTransactions: [],
	setSelectedTransactions: (transaction) =>
		set((state) => ({
			selectedTransactions: [...state.selectedTransactions, transaction],
		})),

	deleteSelectedTransaction: (transaction) =>
		set((state) => ({
			selectedTransactions: state.selectedTransactions.filter(
				(t) => t.id !== transaction.id,
			),
		})),

	setSelectAndDeselectAllTransactions: (transactions) =>
		set((state) => ({
			selectedTransactions: state.selectedTransactions.length
				? []
				: transactions,
		})),

	filteredTransactions: [],
	setFilteredTransactions: (query) =>
		set((state) => {
			if (query) {
				const filtered = state.transactions.filter((transaction) =>
					Object.entries(transaction).some(([key, value]) => {
						if (key === "id") return false;
						return String(value)
							.toLowerCase()
							.startsWith(query.toLowerCase());
					}),
				);
				return { filteredTransactions: filtered };
			}
			return { filteredTransactions: state.transactions };
		}),

	setSortedTransactions: (key, direction) =>
		set((state) => {
			if (key === null || direction === null) {
				return { filteredTransactions: [...state.transactions] };
			} else {
				const sortedTransactions = [...state.filteredTransactions].sort(
					(a, b) => {
						const sortValue = direction === "asc" ? 1 : -1;
						if (a[key] && b[key] && a[key] < b[key])
							return -1 * sortValue;
						if (a[key] && b[key] && a[key] > b[key])
							return 1 * sortValue;
						return 0;
					},
				);
				return { filteredTransactions: sortedTransactions };
			}
		}),

	transactionCount: 0,
	setTransactionCount: (count) => set({ transactionCount: count }),
}));
