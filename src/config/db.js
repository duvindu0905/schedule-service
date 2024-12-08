require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI_SCHEDULE;  // Make sure the connection string is correct
    if (!mongoURI) {
      throw new Error('Mongo URI is not defined in .env');
    }
    mongoose.set('strictQuery', true);  // Optional based on Mongoose version
    await mongoose.connect(mongoURI);  // Connect to MongoDB

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;  // Export the connectDB function
