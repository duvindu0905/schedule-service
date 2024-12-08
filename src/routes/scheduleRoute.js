const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');  // Import controller

// Route to create a new schedule (POST)
router.post('/schedules', scheduleController.createSchedule);

// Route to get all schedules (GET)
router.get('/schedules', scheduleController.getAllSchedules);

// Route to get a schedule by scheduleId (GET)
router.get('/schedules/:scheduleId', scheduleController.getScheduleByScheduleId);

// Route to delete a schedule by scheduleId (DELETE)
router.delete('/schedules/:scheduleId', scheduleController.deleteScheduleByScheduleId);

module.exports = router;  // Export the router to be used in app.js
