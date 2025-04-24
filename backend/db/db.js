import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MongoDB URL is not defined');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (e) {
    console.error('MongoDB connection error:', e);
  }
};

export default connectToDatabase;
