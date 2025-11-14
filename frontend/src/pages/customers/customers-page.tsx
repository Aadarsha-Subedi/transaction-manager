import { useEffect } from "react";

import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import axios from "axios";

import { Container } from "../../components/container.tsx";

import { useCustomerStore, type Customer } from "../../store/customerStore.ts";

import {
	AddCustomerPage,
	DeleteCustomerPage,
	UpdateCustomerPage,
} from "./customer-crud.tsx";

import { usePaginationStore } from "../../store/paginationStore.ts";
import { useSortStore } from "../../store/sortStore.ts";
import { useFlowStore } from "../../store/flowStore.ts";
import { LoaderInfo } from "../../components/loader-info.tsx";
import { ErrorInfo } from "../../components/error-info.tsx";

export const CustomerPage = () => {
	const {
		customers,
		setCustomers,
		setAddCustomerModal,
		setUpdateCustomerModal,
		setDeleteCustomerModal,
		setCurrentCustomer,
		selectedCustomers,
		setSelectedCustomers,
		deleteSelectedCustomer,
		setSelectAndDeselectAllCustomers,
		filteredCustomers,
		setFilteredCustomers,
		customerCount,
		setCustomerCount,
		setSortedCustomers,
	} = useCustomerStore();
	const {
		limit,
		offset,
		setLimit,
		setOffset,
		isFirstPage,
		isLastPage,
		setIsFirstPage,
		setIsLastPage,
	} = usePaginationStore();
	const { key, setKey, direction, setDirection } = useSortStore();
	const { loading, setLoading, error, setError } = useFlowStore();

	useEffect(() => {
		return () => {
			setLimit(30);
			setOffset(0);
			setIsFirstPage(true);
			setIsLastPage(false);
			setKey(null);
			setDirection(null);
			setLoading(false);
			setError(false);
			setCustomerCount(0);
			setCustomers([]);
		};
	}, []);
	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				setLoading(true);
				setError(false);
				const response = await axios({
					url: "http://localhost:8000/customers",
					method: "POST",
					data: { limit, offset },
				});
				const count = response.data.count;
				setCustomerCount(count);
				setCustomers(response.data.data);
				setIsFirstPage(offset === 0);
				setIsLastPage(offset + limit >= count);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchCustomers();
	}, [limit, offset]);
	useEffect(() => {
		setFilteredCustomers();
	}, [customers]);

	function selectCurrentCustomer(selectedCustomer: Customer) {
		setSelectedCustomers(selectedCustomer);
	}
	function updateFilteredCustomers(query: string) {
		setFilteredCustomers(query);
	}
	function getFirstPage() {
		setOffset(0);
	}
	function getPrevPage() {
		if (offset - limit >= 0) {
			setOffset(offset - limit);
		}
	}
	function getNextPage() {
		if (limit + offset < customerCount) {
			setOffset(offset + limit);
		}
	}
	function getLastPage() {
		setOffset(customerCount - limit);
	}
	function handleSort(columnKey: keyof Customer) {
		let newDirection: "asc" | "desc" | null = "asc";

		if (key !== columnKey) {
			newDirection = "asc";
		} else {
			newDirection =
				direction === "asc"
					? "desc"
					: direction === "desc"
						? null
						: "asc";
		}
		setKey(columnKey);
		setDirection(newDirection);
		setSortedCustomers(columnKey, newDirection);
	}

	if (loading) {
		return <LoaderInfo />;
	} else if (error) {
		return <ErrorInfo />;
	}

	return (
		<>
			<Container>
				<button
					onClick={() => {
						setAddCustomerModal(true);
					}}
					className="btn btn-primary flex items-center justify-between gap-x-1"
				>
					<IconPlus className="cursor-pointer" />
					Add a new customer
				</button>
				<div className="search-wrapper">
					<IconSearch className="search-icon" />
					<input
						type="text"
						placeholder="Search for a customer..."
						className="search-input"
						onChange={(e) => {
							e.preventDefault();
							updateFilteredCustomers(e.target.value);
						}}
					/>
				</div>
				<div className="bg-slate-600">
					<table>
						<thead>
							<tr className="border-b-2 text-xl">
								<th>
									<input
										type="checkbox"
										onChange={() => {
											setSelectAndDeselectAllCustomers(
												customers,
											);
										}}
										checked={
											customers.length ===
											selectedCustomers.length
										}
									/>
								</th>
								<th
									className="cursor-pointer"
									onClick={() => {
										handleSort("id");
									}}
								>
									Id
								</th>
								<th
									className="cursor-pointer"
									onClick={() => {
										handleSort("name");
									}}
								>
									Name
								</th>
								<th
									className="cursor-pointer"
									onClick={() => {
										handleSort("age");
									}}
								>
									Age
								</th>
								<th
									className="cursor-pointer"
									onClick={() => {
										handleSort("gender");
									}}
								>
									Gender
								</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredCustomers.map(
								(
									customer: Customer,
									index: number,
								): React.ReactNode => {
									return (
										<tr
											key={index}
											className="text- border-b text-base hover:bg-slate-500"
										>
											<td>
												<input
													type="checkbox"
													onChange={() => {
														selectedCustomers.indexOf(
															customer,
														) === -1
															? selectCurrentCustomer(
																	customer,
																)
															: deleteSelectedCustomer(
																	customer,
																);
													}}
													checked={
														selectedCustomers.indexOf(
															customer,
														) !== -1
													}
												/>
											</td>
											<td>{customer.id}</td>
											<td>{customer.name}</td>
											<td>{customer.age}</td>
											<td>{customer.gender}</td>
											<td className="flex items-center gap-x-2">
												<IconEdit
													className="cursor-pointer"
													onClick={() => {
														setCurrentCustomer(
															customer,
														);
														setUpdateCustomerModal(
															true,
														);
													}}
												/>
												<IconTrash
													className="cursor-pointer"
													onClick={() => {
														setCurrentCustomer(
															customer,
														);
														setDeleteCustomerModal(
															true,
														);
													}}
												/>
											</td>
										</tr>
									);
								},
							)}
						</tbody>
					</table>
				</div>
				<div className="flex items-center justify-between gap-x-2">
					<button
						className="btn btn-secondary"
						disabled={isFirstPage}
						onClick={() => getFirstPage()}
					>
						First
					</button>
					<button
						className="btn btn-primary"
						disabled={isFirstPage}
						onClick={() => getPrevPage()}
					>
						Prev
					</button>
					<p>
						Showing records {offset + 1} -{" "}
						{Math.min(limit + offset, customerCount)} of{" "}
						{customerCount}
					</p>
					<button
						className="btn btn-primary"
						onClick={() => {
							getNextPage();
						}}
						disabled={isLastPage}
					>
						Next
					</button>
					<button
						className="btn btn-secondary"
						onClick={() => getLastPage()}
						disabled={isLastPage}
					>
						Last
					</button>
				</div>
			</Container>
			<UpdateCustomerPage />
			<DeleteCustomerPage />
			<AddCustomerPage />
		</>
	);
};
