import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

const addIncome = async (req, res) => {
    try {
        const { income, emi, rent, investment, others, date } = req.body;
        
        // Ensure all values are numbers
        const newIncome = new Income({
            income: Number(income) || 0,
            emi: Number(emi) || 0,
            rent: Number(rent) || 0,
            investment: Number(investment) || 0,
            others: Number(others) || 0,
            date
        });
        
        await newIncome.save();
        console.log('Income added:', newIncome);
        
        res.status(201).json({ message: "Income record added successfully", data: newIncome });
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getTotalIncome = async (req, res) => {
    try {
        const incomes = await Income.find();
        console.log('Found incomes:', incomes.length);
        
        const total = incomes.reduce((sum, entry) => {
            const incomeValue = Number(entry.income) || 0;
            const emiValue = Number(entry.emi) || 0;
            const rentValue = Number(entry.rent) || 0;
            const investmentValue = Number(entry.investment) || 0;
            const othersValue = Number(entry.others) || 0;
            
            return sum + (incomeValue - (emiValue + rentValue + investmentValue + othersValue));
        }, 0);
        
        console.log('Total income calculated:', total);
        
        res.json({ totalIncome: total });
    } catch (error) {
        console.error('Error calculating total income:', error);
        res.status(500).json({ message: "Error calculating total income", error: error.message });
    }
};

// Improved function to get balance with better error handling and logging
const getBalance = async (req, res) => {
    try {
        console.log('Calculating balance...');
        
        // Calculate total income
        const incomes = await Income.find();
        console.log('Found income records:', incomes.length);
        
        const totalIncome = incomes.reduce((sum, entry) => {
            return sum + (Number(entry.income) || 0);
        }, 0);
        console.log('Total income calculated:', totalIncome);
        
        // Calculate total expenses from your Expense model
        const expenses = await Expense.find();
        console.log('Found expense records:', expenses.length);
        
        const totalExpenses = expenses.reduce((sum, entry) => {
            return sum + (Number(entry.amount) || 0);
        }, 0);
        console.log('Total expenses calculated:', totalExpenses);
        
        // Calculate total deductions from income model
        const totalDeductions = incomes.reduce((sum, entry) => {
            const emiValue = Number(entry.emi) || 0;
            const rentValue = Number(entry.rent) || 0;
            const investmentValue = Number(entry.investment) || 0;
            const othersValue = Number(entry.others) || 0;
            
            return sum + (emiValue + rentValue + investmentValue + othersValue);
        }, 0);
        console.log('Total deductions calculated:', totalDeductions);
        
        // Final balance calculation
        const balance = totalIncome - totalDeductions - totalExpenses;
        console.log('Final balance calculated:', balance);
        
        res.json({ 
            totalIncome, 
            totalExpenses, 
            totalDeductions,
            balance
        });
    } catch (error) {
        console.error('Error calculating balance:', error);
        res.status(500).json({ message: "Error calculating balance", error: error.message });
    }
};

// New function to get all income records
const getAllIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: "Error fetching incomes", error: error.message });
    }
};

export { addIncome, getTotalIncome, getBalance, getAllIncomes };