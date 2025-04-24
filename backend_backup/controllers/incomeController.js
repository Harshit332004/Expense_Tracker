import Income from "../models/Income.js";

const addIncome = async (req, res) => {
    try {
        const { income, emi, rent, investment, others, date } = req.body;
        
        const newIncome = new Income({
            income,
            emi,
            rent,
            investment,
            others,
            date
        });
        
        await newIncome.save();
        res.status(201).json({ message: "Income record added successfully", data: newIncome });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export {addIncome}