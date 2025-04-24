import express from 'express';
import connectToDatabase from './db/db.js';
import incomeRouter from './routes/income.js';
import expenseRouter from './routes/expense.js';
import cors from 'cors';

const app = express();

// Enable CORS for all routes with specific options
app.use(cors({
    origin: [
        'http://localhost:3000', 
        'http://localhost:50615', 
        'http://127.0.0.1:3000',
        'http://192.168.29.111:3000',  // Add your IP
        'http://192.168.29.111:50615'  // Add your IP with Flutter port
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/public/uploads', express.static('public/uploads'));

// Connect to database
connectToDatabase();

// API routes
app.use('/api/income', incomeRouter);
app.use('/api/expenses', expenseRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: "hello world" });
});

// Test API route
app.get('/api', (req, res) => {
    res.json({ message: "API is working" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});