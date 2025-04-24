import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Shopping', 'Food', 'Entertainment', 'Travel', 'Health', 'Bills', 'Other'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  receiptImage: {
    type: String, // URL or file path of the uploaded image
    required: false
  }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
