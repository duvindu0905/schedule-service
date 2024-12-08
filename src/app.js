// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');  // MongoDB connection
const scheduleRoutes = require('./routes/scheduleRoute');  // Correct import for schedule routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Base route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Schedule Service API!' });
});

// Use schedule routes for API endpoints under /schedule-service
app.use('/schedule-service', scheduleRoutes);  // Ensure you're using scheduleRoutes

// Fallback route for undefined paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
