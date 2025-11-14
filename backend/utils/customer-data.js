// customer-data.js

export const CustomerData = createCustomerData();

function createCustomerData() {
	const name = ['John', 'Nate', 'Suarez', 'Almiron', 'Gitlabs', 'Poing'];
	const age = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
	const gender = ['Male', 'Female'];
	const data = [];

	for (let i = 0; i < 107; i++) {
		const randomName = getRandomValue(name);
		const randomAge = getRandomValue(age);
		const randomGender = getRandomValue(gender);
		data.push({
			id: i + 1,
			name: randomName,
			age: randomAge,
			gender: randomGender === 'Male' ? 'Male' : 'Female',
		});
	}

	return data;
}

function getRandomValue(array) {
	return array[Math.floor(Math.random() * array.length)];
}
