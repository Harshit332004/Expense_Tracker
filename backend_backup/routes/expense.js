import express from 'express';
import { addExpense, getExpenses } from '../controllers/expenseController.js';
import upload from '../config/multer.js'; // Import multer

const router = express.Router();

router.post('/add', upload.single('receiptImage'), addExpense);
router.get('/', getExpenses);

export default router;
