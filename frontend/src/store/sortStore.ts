import { create } from "zustand";
import type { Customer } from "./customerStore";
import type { Transaction } from "./transactionStore";

type SortKey = keyof Customer | keyof Transaction;

interface SortProps {
	key: SortKey | null;
	setKey: (newKey: SortKey | null) => void;
	direction: "asc" | "desc" | null;
	setDirection: (newDirection: "asc" | "desc" | null) => void;
}

export const useSortStore = create<SortProps>((set) => ({
	key: null,
	setKey: (newKey) => set({ key: newKey }),
	direction: null,
	setDirection: (newDirection) => set({ direction: newDirection }),
}));
