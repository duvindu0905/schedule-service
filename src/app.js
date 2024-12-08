const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');  // MongoDB connection
const scheduleRoutes = require('./routes/scheduleRoute');  // Import the schedule routes
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');  // Swagger documentation

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use schedule routes under /schedule-service
app.use('/schedule-service', scheduleRoutes);  

// Base route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Schedule Service API!' });
});

// Fallback route for undefined paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
