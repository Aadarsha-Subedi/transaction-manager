import { create } from "zustand";

export interface Customer {
	id: number | undefined;
	name: string;
	age: number;
	gender: "Male" | "Female";
}

interface CustomerStore {
	customers: Customer[];

	setCustomers: (customers: Customer[]) => void;

	addCustomerModal: boolean;
	setAddCustomerModal: (addCustomerModal: boolean) => void;
	addCustomer: (customer: Customer) => void;

	updateCustomerModal: boolean;
	setUpdateCustomerModal: (updateCustomerModal: boolean) => void;
	updateCustomer: (customer: Customer) => void;

	deleteCustomerModal: boolean;
	setDeleteCustomerModal: (deleteCustomerModal: boolean) => void;
	deleteCustomer: (id: number) => void;

	currentCustomer: Customer | null;
	setCurrentCustomer: (customer: Customer | null) => void;

	selectedCustomers: Customer[];
	setSelectedCustomers: (customers: Customer) => void;
	deleteSelectedCustomer: (customer: Customer) => void;
	setSelectAndDeselectAllCustomers: (customers: Customer[]) => void;

	filteredCustomers: Customer[];
	setFilteredCustomers: (query?: string) => void;

	setSortedCustomers: (
		key: keyof Customer,
		direction: "asc" | "desc" | null,
	) => void;

	customerCount: number;
	setCustomerCount: (newCustomerCount: number) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
	customers: [],

	setCustomers: (newCustomers) =>
		set(() => ({
			customers: newCustomers,
		})),

	addCustomerModal: false,
	setAddCustomerModal: (value) =>
		set(() => ({
			addCustomerModal: value,
		})),
	addCustomer: (customer) =>
		set((state) => ({ customers: [...state.customers, customer] })),

	updateCustomerModal: false,
	setUpdateCustomerModal: (value) =>
		set(() => ({
			updateCustomerModal: value,
		})),
	updateCustomer: (updatedCustomer) =>
		set((state) => ({
			customers: state.customers.map((customer) =>
				customer.id === updatedCustomer.id ? updatedCustomer : customer,
			),
		})),

	deleteCustomerModal: false,
	setDeleteCustomerModal: (value) =>
		set(() => ({
			deleteCustomerModal: value,
		})),
	deleteCustomer: (id) =>
		set((state) => ({
			customers: state.customers.filter(
				(customers) => customers.id !== id,
			),
		})),

	currentCustomer: null,
	setCurrentCustomer: (customer) =>
		set({
			currentCustomer: customer,
		}),

	selectedCustomers: [],
	setSelectedCustomers: (selectedCustomer) =>
		set((state) => ({
			selectedCustomers: [...state.selectedCustomers, selectedCustomer],
		})),
	deleteSelectedCustomer: (selectedCustomer) =>
		set((state) => ({
			selectedCustomers: state.selectedCustomers.filter(
				(selectedCustomers) =>
					selectedCustomers.id !== selectedCustomer.id,
			),
		})),
	setSelectAndDeselectAllCustomers: (customers: Customer[]) =>
		set((state) => ({
			selectedCustomers: state.selectedCustomers.length ? [] : customers,
		})),

	filteredCustomers: [],
	setFilteredCustomers: (query?: string) =>
		set((state) => {
			if (query) {
				const filtered = state.customers.filter((customer) =>
					Object.entries(customer).some(([key, value]) => {
						if (key === "id") return false;
						return String(value)
							.toLowerCase()
							.startsWith(query.toLowerCase());
					}),
				);
				return { filteredCustomers: filtered };
			}
			return { filteredCustomers: state.customers };
		}),

	setSortedCustomers: (newKey, newDirection) =>
		set((state) => {
			if (newKey === null || newDirection === null) {
				return { filteredCustomers: [...state.customers] };
			} else {
				const sortedCustomers = [...state.customers].sort((a, b) => {
					const sortValue = newDirection === "asc" ? 1 : -1;
					if (a[newKey] && b[newKey] && a[newKey] < b[newKey])
						return -1 * sortValue;
					if (a[newKey] && b[newKey] && a[newKey] > b[newKey])
						return 1 * sortValue;
					return 0;
				});
				return { filteredCustomers: sortedCustomers };
			}
		}),

	customerCount: 0,
	setCustomerCount: (newCustomerCount) =>
		set(() => ({
			customerCount: newCustomerCount,
		})),
}));
