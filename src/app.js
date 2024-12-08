const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const scheduleRoutes = require('./routes/scheduleRoute');  // Ensure this path is correct
const swaggerDocument = require('../swagger/swagger.json');  // Swagger documentation

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB using connectDB from db.js
connectDB();


// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use schedule routes for API endpoints under /schedule-service
app.use('/schedule-service', scheduleRoutes);  // This ensures that all schedule routes are prefixed with /schedule-service

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Schedule Service API!');
});

module.exports = app;
