import express from 'express';
import { addIncome, getTotalIncome, getBalance, getAllIncomes } from '../controllers/incomeController.js';

const router = express.Router();
router.post('/add', addIncome);
router.get('/total', getTotalIncome);
router.get('/balance', getBalance); // Endpoint for balance
router.get('/', getAllIncomes); // Endpoint to get all income records

export default router;