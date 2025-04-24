import express from 'express';
import { addIncome } from '../controllers/incomeController.js';

const router = express.Router();
router.post('/add', addIncome);

export default router;