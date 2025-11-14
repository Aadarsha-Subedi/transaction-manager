import { useEffect } from "react";
import { Container } from "../components/container";
import { useActiveTabStore } from "../store/activeTabStore";
import { CustomerPage } from "./customers/customers-page";
import { TransactionPage } from "./transactions/transaction-page";
import { useCustomerStore } from "../store/customerStore";
import { useTransactionStore } from "../store/transactionStore";

export const Home = () => {
	const { activeTab, setActiveTab } = useActiveTabStore();
	const { customerCount } = useCustomerStore();
	const { transactionCount } = useTransactionStore();

	useEffect(() => {
		setActiveTab("customers");

		return () => {
			setActiveTab("");
		};
	}, []);

	function renderContent() {
		if (activeTab === "customers") {
			return <CustomerPage />;
		} else if (activeTab === "transactions") {
			return <TransactionPage />;
		}
	}

	return (
		<Container>
			<nav className="flex items-center justify-center border-4 bg-neutral-100">
				<button
					onClick={() => setActiveTab("customers")}
					className={`px-4 py-1 hover:bg-black hover:text-white ${activeTab === "customers" && "bg-black text-white"}`}
				>
					Customers{" "}
					{activeTab === "customers" && customerCount
						? customerCount
						: null}
				</button>
				<button
					onClick={() => {
						setActiveTab("transactions");
					}}
					className={`px-4 py-1 hover:bg-black hover:text-white ${activeTab === "transactions" && "bg-black text-white"}`}
				>
					Transactions{" "}
					{activeTab === "transactions" && transactionCount
						? transactionCount
						: null}
				</button>
			</nav>
			{renderContent()}
		</Container>
	);
};
