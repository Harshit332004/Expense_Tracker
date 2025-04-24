import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
      const mongoURI = 'mongodb+srv://root:root@exptracker.grxm0ve.mongodb.net/exp-collection?retryWrites=true&w=majority&appName=ExpTracker';
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