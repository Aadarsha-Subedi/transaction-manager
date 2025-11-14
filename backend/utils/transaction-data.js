// customer-data.js

export const TransactionData = createTransactionData();

function createTransactionData() {
	const name = ['John', 'Nate', 'Suarez', 'Almiron', 'Gitlabs', 'Poing'];
	const amount = [10000, 12000, 5400, 2300, 5600, 120, 430, 665, 66000];
	const type = ['Income', 'Expense'];
	const data = [];

	for (let i = 0; i < 340; i++) {
		const randomName = getRandomValue(name);
		const randomAmount = getRandomValue(amount);
		const randomType = getRandomValue(type);
		data.push({
			id: i + 1,
			name: randomName,
			amount: randomAmount,
			type: randomType === 'Income' ? 'Income' : 'Expense',
		});
	}

	return data;
}

function getRandomValue(array) {
	return array[Math.floor(Math.random() * array.length)];
}
