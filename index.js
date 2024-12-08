const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');  // Import connectDB function from db.js
const scheduleRoutes = require('./src/routes/scheduleRoute');  // Import schedule routes

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB using connectDB from db.js
connectDB();

// Use schedule routes for API endpoints under /schedule-service
app.use('/schedule-service', scheduleRoutes);  // This ensures that all schedule routes are prefixed with /schedule-service

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Schedule Service API!');
});

// Define the port
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
