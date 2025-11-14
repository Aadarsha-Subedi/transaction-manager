import { useTransactionStore } from "../../store/transactionStore.ts";

export function UpdateTransactionPage() {
	const {
		updateTransaction,
		updateTransactionModal,
		setUpdateTransactionModal,
		currentTransaction,
		setCurrentTransaction,
	} = useTransactionStore();

	function updateCurrentTransaction(formData: FormData): void {
		if (!currentTransaction || !currentTransaction.id) return;

		const newName = String(formData.get("name"));
		const newAmount = Number(formData.get("amount"));
		const newType = String(formData.get("type"));

		updateTransaction({
			id: currentTransaction.id,
			name: newName,
			amount: newAmount,
			type: newType === "Expense" ? "Expense" : "Income",
		});

		setUpdateTransactionModal(false);
	}

	return (
		updateTransactionModal &&
		currentTransaction && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
				<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const formData: FormData = new FormData(
								e.currentTarget,
							);
							updateCurrentTransaction(formData);
						}}
						className="flex flex-col gap-4"
					>
						<div className="flex flex-col gap-2">
							<label htmlFor="name" className="font-medium">
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								defaultValue={currentTransaction.name}
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="amount" className="font-medium">
								Amount
							</label>
							<input
								id="amount"
								name="amount"
								type="number"
								defaultValue={currentTransaction.amount}
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="type" className="font-medium">
								Type
							</label>
							<input
								id="type"
								name="type"
								type="text"
								defaultValue={currentTransaction.type}
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div className="mt-4 flex justify-end gap-2">
							<button type="submit" className="btn btn-primary">
								Update
							</button>
							<button
								type="button"
								onClick={() => {
									setCurrentTransaction(null);
									setUpdateTransactionModal(false);
								}}
								className="btn btn-secondary"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
}

export function DeleteTransactionPage() {
	const {
		deleteTransaction,
		deleteTransactionModal,
		setDeleteTransactionModal,
		currentTransaction,
		setCurrentTransaction,
	} = useTransactionStore();

	function deleteCurrentTransaction() {
		if (!currentTransaction || !currentTransaction.id) return;

		deleteTransaction(currentTransaction.id);
		setDeleteTransactionModal(false);
		setCurrentTransaction(null);
	}

	return (
		deleteTransactionModal &&
		currentTransaction && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
				<div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg">
					<p className="text-2xl font-bold">
						Are you sure you want to delete this transaction?
					</p>
					<p className="text-sm text-neutral-700">
						This cannot be undone.
					</p>
					<div className="mt-4 flex items-center justify-end gap-x-2">
						<button
							type="button"
							onClick={deleteCurrentTransaction}
							className="btn btn-primary"
						>
							Delete
						</button>
						<button
							type="button"
							onClick={() => {
								setDeleteTransactionModal(false);
								setCurrentTransaction(null);
							}}
							className="btn btn-secondary"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		)
	);
}

export function AddTransactionPage() {
	const {
		transactions,
		addTransaction,
		addTransactionModal,
		setAddTransactionModal,
	} = useTransactionStore();

	function addNewTransaction(formData: FormData): void {
		const newName = String(formData.get("name"));
		const newAmount = Number(formData.get("amount"));
		const newType = String(formData.get("type"));

		addTransaction({
			id: transactions.length + 1,
			name: newName,
			amount: newAmount,
			type: newType === "Expense" ? "Expense" : "Income",
		});

		setAddTransactionModal(false);
	}

	return (
		addTransactionModal && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
				<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const formData: FormData = new FormData(
								e.currentTarget,
							);
							addNewTransaction(formData);
						}}
						className="flex flex-col gap-4"
					>
						<div className="flex flex-col gap-2">
							<label htmlFor="name" className="font-medium">
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="amount" className="font-medium">
								Amount
							</label>
							<input
								id="amount"
								name="amount"
								type="number"
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="type" className="font-medium">
								Type
							</label>
							<input
								id="type"
								name="type"
								type="text"
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div className="mt-4 flex justify-end gap-2">
							<button type="submit" className="btn btn-primary">
								Add
							</button>
							<button
								type="button"
								onClick={() => setAddTransactionModal(false)}
								className="btn btn-secondary"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
}
