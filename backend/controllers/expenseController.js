import Expense from "../models/Expense.js";

const addExpense = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const receiptImage = req.file ? req.file.path : null; // Get image path if uploaded

    if (!amount || !description || !category || !date) {
      return res.status(400).json({ error: "All fields except receipt image are required!" });
    }

    const newExpense = new Expense({
      amount,
      description,
      category,
      date,
      receiptImage
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", expense: newExpense });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json(expenses);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  };
  
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany({});
    res.status(200).json({ message: 'All expenses cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addExpense, getExpenses, deleteExpense, clearAllExpenses };
