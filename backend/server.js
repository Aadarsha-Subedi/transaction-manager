import express from 'express';
import cors from 'cors';

import { CustomerData } from './utils/customer-data.js';
import { TransactionData } from './utils/transaction-data.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/customers', (req, res) => {
	const { limit, offset } = req.body;
	return setTimeout(
		() =>
			res.status(200).json({
				data: CustomerData.slice(offset, offset + limit),
				count: CustomerData.length,
			}),
		5000
	);
});
app.post('/transactions', (req, res) => {
	const { limit, offset } = req.body;
	return setTimeout(
		() =>
			res.status(200).json({
				data: TransactionData.slice(offset, offset + limit),
				count: TransactionData.length,
			}),
		5000
	);
});

app.listen(8000);
