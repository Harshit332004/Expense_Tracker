import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Context for the AI about the expense tracker app
const systemPrompt = `You are a helpful voice assistant for an expense tracking application. 
Your role is to help users navigate the app, understand their financial data, and provide helpful insights.

Available actions you can help with:
- Navigation: dashboard, add expense, income, analytics, settings
- Reading financial data: balance, monthly stats, expenses, income
- Adding transactions: expenses and income with amounts and descriptions
- Financial insights: spending patterns, budget advice, saving tips

Keep responses concise and helpful. If a user asks to navigate somewhere, respond with the page name.
If they ask about financial data, provide clear, friendly explanations.
If they want to add a transaction, confirm the details before proceeding.

Always be polite and helpful.`;

// Chat history for context
let chatHistory = [
  {
    role: "user",
    parts: [{ text: "Hello, I need help with my expense tracker app." }]
  },
  {
    role: "model",
    parts: [{ text: "Hello! I'm your expense tracking assistant. I can help you navigate the app, read your financial data, add transactions, and provide financial insights. How can I help you today?" }]
  }
];

router.post('/process-command', async (req, res) => {
  try {
    const { command } = req.body;
    
    if (!command) {
      return res.status(400).json({ error: 'No command provided' });
    }

    console.log('Processing voice command:', command);

    // Add user command to history
    chatHistory.push({
      role: "user",
      parts: [{ text: command }]
    });

    // Create chat session with context
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.7,
      },
    });

    // Send the command with system context
    const fullPrompt = `${systemPrompt}\n\nUser command: ${command}\n\nPlease respond appropriately to this voice command.`;
    
    const result = await chat.sendMessage(fullPrompt);
    const response = result.response.text();

    // Add AI response to history
    chatHistory.push({
      role: "model",
      parts: [{ text: response }]
    });

    // Keep history manageable (last 10 exchanges)
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }

    console.log('AI response:', response);

    res.json({ 
      response: response,
      success: true 
    });

  } catch (error) {
    console.error('Error processing AI command:', error);
    res.status(500).json({ 
      error: 'Failed to process command',
      details: error.message 
    });
  }
});

// Get available voice commands
router.get('/voice-commands', (req, res) => {
  const commands = {
    navigation: [
      "navigate to dashboard",
      "go to add expense",
      "open income page",
      "show analytics",
      "open settings"
    ],
    actions: [
      "read balance",
      "read monthly stats",
      "add expense [amount] [description]",
      "add income [amount] [description]"
    ],
    queries: [
      "how much did I spend this month?",
      "what's my current balance?",
      "show me my income",
      "give me financial advice"
    ]
  };
  
  res.json({ commands });
});

// Reset chat history
router.post('/reset-context', (req, res) => {
  chatHistory = [
    {
      role: "user",
      parts: [{ text: "Hello, I need help with my expense tracker app." }]
    },
    {
      role: "model",
      parts: [{ text: "Hello! I'm your expense tracking assistant. I can help you navigate the app, read your financial data, add transactions, and provide financial insights. How can I help you today?" }]
    }
  ];
  
  res.json({ message: 'Chat context reset successfully' });
});

export default router;