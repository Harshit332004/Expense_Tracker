import express from 'express';
import connectToDatabase from './db/db.js';
import incomeRouter from './routes/income.js';
import expenseRouter from './routes/expense.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use('/public/uploads', express.static('public/uploads'));
connectToDatabase();

app.use(cors());
app.use('/api/income', incomeRouter);
app.use('/api/expenses', expenseRouter);

app.get('/', (req, res) => {
    res.send("hello world");
});

// Use the port from the .env file, default to 3000 if not set
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
