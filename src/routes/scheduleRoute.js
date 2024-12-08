const express = require('express');
const router = express.Router();
const {
  createSchedule,
  getAllSchedules,
  getScheduleByScheduleId,
  deleteScheduleByScheduleId
} = require('../controllers/scheduleController');

// Route to create a new schedule (POST)
router.post('/schedules', createSchedule);

// Route to get all schedules (GET)
router.get('/schedules', getAllSchedules);

// Route to get a schedule by scheduleId (GET)
router.get('/schedules/:scheduleId', getScheduleByScheduleId);

// Route to delete a schedule by scheduleId (DELETE)
router.delete('/schedules/:scheduleId', deleteScheduleByScheduleId);

module.exports = router;
