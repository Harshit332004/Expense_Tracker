import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    income: { type: Number, required: true },
    emi: { type: Number, default: 0 },
    rent: { type: Number, default: 0 },
    investment: { type: Number, default: 0 },
    others: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;