const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Route to create a new schedule
router.post('/schedules', scheduleController.createSchedule);

// Route to get all schedules
router.get('/schedules', scheduleController.getAllSchedules);

// Route to get a schedule by scheduleId
router.get('/schedules/:scheduleId', scheduleController.getScheduleByScheduleId);

// Route to delete a schedule by scheduleId
router.delete('/schedules/:scheduleId', scheduleController.deleteScheduleByScheduleId);

module.exports = router;
