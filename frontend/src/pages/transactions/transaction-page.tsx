import { useEffect } from "react";
import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import axios from "axios";

import { Container } from "../../components/container";
import {
	useTransactionStore,
	type Transaction,
} from "../../store/transactionStore.ts";
import { usePaginationStore } from "../../store/paginationStore.ts";
import {
	AddTransactionPage,
	DeleteTransactionPage,
	UpdateTransactionPage,
} from "./transaction-crud.tsx";
import { useSortStore } from "../../store/sortStore.ts";
import { useFlowStore } from "../../store/flowStore.ts";
import { LoaderInfo } from "../../components/loader-info.tsx";
import { ErrorInfo } from "../../components/error-info.tsx";

export const TransactionPage = () => {
	const {
		transactions,
		setTransactions,
		setAddTransactionModal,
		setUpdateTransactionModal,
		setDeleteTransactionModal,
		setCurrentTransaction,
		selectedTransactions,
		setSelectedTransactions,
		deleteSelectedTransaction,
		setSelectAndDeselectAllTransactions,
		filteredTransactions,
		setFilteredTransactions,
		transactionCount,
		setTransactionCount,
		setSortedTransactions,
	} = useTransactionStore();

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
			setTransactionCount(0);
			setTransactions([]);
		};
	}, []);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				setLoading(true);
				const response = await axios({
					url: "http://localhost:8000/transactions",
					method: "POST",
					data: { limit, offset },
				});
				const count = response.data.count;
				setTransactionCount(count);
				setTransactions(response.data.data);
				setIsFirstPage(offset === 0);
				setIsLastPage(offset + limit >= count);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchTransactions();
	}, [limit, offset]);

	useEffect(() => {
		setFilteredTransactions();
	}, [transactions]);

	function selectCurrentTransaction(transaction: Transaction) {
		setSelectedTransactions(transaction);
	}

	function updateFilteredTransactions(query: string) {
		setFilteredTransactions(query);
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
		if (offset + limit < transactionCount) {
			setOffset(offset + limit);
		}
	}
	function getLastPage() {
		setOffset(transactionCount - limit);
	}

	function handleSort(columnKey: keyof Transaction) {
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
		setSortedTransactions(columnKey, newDirection);
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
					onClick={() => setAddTransactionModal(true)}
					className="btn btn-primary flex items-center justify-between gap-x-1"
				>
					<IconPlus className="cursor-pointer" />
					Add a new transaction
				</button>

				<div className="search-wrapper">
					<IconSearch className="search-icon" />
					<input
						type="text"
						placeholder="Search for a transaction..."
						className="search-input"
						onChange={(e) =>
							updateFilteredTransactions(e.target.value)
						}
					/>
				</div>

				<div className="bg-slate-600">
					<table>
						<thead>
							<tr className="border-b-2 text-xl">
								<th>
									<input
										type="checkbox"
										onChange={() =>
											setSelectAndDeselectAllTransactions(
												transactions,
											)
										}
										checked={
											transactions.length ===
											selectedTransactions.length
										}
									/>
								</th>
								<th
									className="cursor-pointer"
									onClick={() => handleSort("id")}
								>
									Id
								</th>
								<th
									className="cursor-pointer"
									onClick={() => handleSort("name")}
								>
									Name
								</th>
								<th
									className="cursor-pointer"
									onClick={() => handleSort("amount")}
								>
									Amount
								</th>
								<th
									className="cursor-pointer"
									onClick={() => handleSort("type")}
								>
									Type
								</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredTransactions.map(
								(transaction: Transaction, index: number) => (
									<tr
										key={index}
										className="text- border-b text-base hover:bg-slate-500"
									>
										<td>
											<input
												type="checkbox"
												onChange={() =>
													selectedTransactions.indexOf(
														transaction,
													) === -1
														? selectCurrentTransaction(
																transaction,
															)
														: deleteSelectedTransaction(
																transaction,
															)
												}
												checked={
													selectedTransactions.indexOf(
														transaction,
													) !== -1
												}
											/>
										</td>
										<td>{transaction.id}</td>
										<td>{transaction.name}</td>
										<td>{transaction.amount}</td>
										<td>{transaction.type}</td>
										<td className="flex items-center gap-x-2">
											<IconEdit
												className="cursor-pointer"
												onClick={() => {
													setCurrentTransaction(
														transaction,
													);
													setUpdateTransactionModal(
														true,
													);
												}}
											/>
											<IconTrash
												className="cursor-pointer"
												onClick={() => {
													setCurrentTransaction(
														transaction,
													);
													setDeleteTransactionModal(
														true,
													);
												}}
											/>
										</td>
									</tr>
								),
							)}
						</tbody>
					</table>
				</div>

				<div className="flex items-center justify-between gap-x-2">
					<button
						className="btn btn-secondary"
						disabled={isFirstPage}
						onClick={getFirstPage}
					>
						First
					</button>
					<button
						className="btn btn-primary"
						disabled={isFirstPage}
						onClick={getPrevPage}
					>
						Prev
					</button>
					<p>
						Showing records {offset + 1} -{" "}
						{Math.min(limit + offset, transactionCount)} of{" "}
						{transactionCount}
					</p>
					<button
						className="btn btn-primary"
						disabled={isLastPage}
						onClick={getNextPage}
					>
						Next
					</button>
					<button
						className="btn btn-secondary"
						disabled={isLastPage}
						onClick={getLastPage}
					>
						Last
					</button>
				</div>
			</Container>
			<UpdateTransactionPage />
			<DeleteTransactionPage />
			<AddTransactionPage />
		</>
	);
};
