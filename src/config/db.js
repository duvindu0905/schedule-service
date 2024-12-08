// src/config/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI_SCHEDULE;
    console.log('Mongo URI:', mongoURI);

    if (!mongoURI) {
      throw new Error("MONGO_URI_SCHEDULE is not defined in .env");
    }

    mongoose.set('strictQuery', true);

    // Connect to MongoDB without deprecated options
    await mongoose.connect(mongoURI);

    console.log('ScheduleService MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit the process if MongoDB connection fails
  }
};

module.exports = connectDB;
