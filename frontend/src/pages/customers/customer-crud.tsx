import { useCustomerStore } from "../../store/customerStore.ts";

export function UpdateCustomerPage() {
	const {
		updateCustomer,
		updateCustomerModal,
		setUpdateCustomerModal,
		currentCustomer,
		setCurrentCustomer,
	} = useCustomerStore();

	function updateCurrentCustomer(formData: FormData): void {
		if (!currentCustomer || !currentCustomer.id) {
			return;
		}
		const newName = String(formData.get("name"));
		const newAge = Number(formData.get("age"));
		const newGender = String(formData.get("gender"));

		updateCustomer({
			id: currentCustomer.id,
			name: newName,
			age: newAge,
			gender: newGender === "Male" ? "Male" : "Female",
		});
		setUpdateCustomerModal(false);
	}

	return (
		updateCustomerModal &&
		currentCustomer && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
				<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const formData: FormData = new FormData(
								e.currentTarget,
							);
							updateCurrentCustomer(formData);
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
								defaultValue={currentCustomer.name}
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="age" className="font-medium">
								Age
							</label>
							<input
								id="age"
								name="age"
								type="number"
								defaultValue={currentCustomer.age}
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="gender" className="font-medium">
								Gender
							</label>
							<input
								id="gender"
								name="gender"
								type="text"
								defaultValue={currentCustomer.gender}
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
									setUpdateCustomerModal(false);
									setCurrentCustomer(null);
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

export function DeleteCustomerPage() {
	const {
		deleteCustomer,
		deleteCustomerModal,
		setDeleteCustomerModal,
		currentCustomer,
		setCurrentCustomer,
	} = useCustomerStore();

	function deleteCurrentCustomer() {
		if (!currentCustomer || !currentCustomer.id) {
			return;
		}
		deleteCustomer(currentCustomer.id);
		setDeleteCustomerModal(false);
		setCurrentCustomer(null);
	}

	return (
		deleteCustomerModal &&
		currentCustomer && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
				<div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg">
					<p className="text-2xl font-bold">
						Are you sure you want to delete this customer?
					</p>
					<p className="text-sm text-neutral-700">
						This cannot be undone.
					</p>
					<div className="mt-4 flex items-center justify-end gap-x-2">
						<button
							type="button"
							onClick={() => deleteCurrentCustomer()}
							className="btn btn-primary"
						>
							Delete
						</button>
						<button
							type="button"
							onClick={() => {
								setDeleteCustomerModal(false);
								setCurrentCustomer(null);
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

export function AddCustomerPage() {
	const { customers, addCustomer, addCustomerModal, setAddCustomerModal } =
		useCustomerStore();

	function addNewCustomer(formData: FormData): void {
		const newName = String(formData.get("name"));
		const newAge = Number(formData.get("age"));
		const newGender = String(formData.get("gender"));
		addCustomer({
			id: customers.length + 1,
			name: newName,
			age: newAge,
			gender: newGender === "Male" ? "Male" : "Female",
		});
		setAddCustomerModal(false);
	}

	return (
		addCustomerModal && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
				<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const formData: FormData = new FormData(
								e.currentTarget,
							);
							addNewCustomer(formData);
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
							<label htmlFor="age" className="font-medium">
								Age
							</label>
							<input
								id="age"
								name="age"
								type="number"
								className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="gender" className="font-medium">
								Gender
							</label>
							<input
								id="gender"
								name="gender"
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
								onClick={() => {
									setAddCustomerModal(false);
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
