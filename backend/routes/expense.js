import express from 'express';
import { addExpense, getExpenses, deleteExpense } from '../controllers/expenseController.js';
import upload from '../config/multer.js'; // Import multer

const router = express.Router();

router.post('/add', upload.single('receiptImage'), addExpense);
router.get('/', getExpenses);
router.delete('/:id', deleteExpense);

export default router;
