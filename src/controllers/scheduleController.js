const axios = require('axios');
const Schedule = require('../models/scheduleModel');  // Import the Schedule model

// Create a new schedule
const createSchedule = async (req, res) => {
  const {
    scheduleId,
    departureTime,
    arrivalTime,
    routeNumber,  // Route number to fetch route data
    permitNumber  // Permit number to fetch permit data
  } = req.body;

  // Validate if routeNumber, permitNumber, scheduleId, departureTime, and arrivalTime are provided
  if (!routeNumber || !permitNumber || !scheduleId || !departureTime || !arrivalTime) {
    return res.status(400).json({ message: 'Route number, permit number, schedule ID, departure time, and arrival time are required' });
  }

  try {
    // Validate if scheduleId already exists
    const existingSchedule = await Schedule.findOne({ scheduleId });
    if (existingSchedule) {
      return res.status(400).json({ message: `Schedule with ID ${scheduleId} already exists` });
    }

    // Select the correct service URLs based on the environment
    const routeServiceUrl = process.env.NODE_ENV === 'production' 
      ? process.env.ROUTE_SERVICE_URL_PRODUCTION 
      : process.env.ROUTE_SERVICE_URL_LOCAL;

    const permitServiceUrl = process.env.NODE_ENV === 'production' 
      ? process.env.PERMIT_SERVICE_URL_PRODUCTION 
      : process.env.PERMIT_SERVICE_URL_LOCAL;

    // Fetch route data from route-service using routeNumber
    const routeResponse = await axios.get(`${routeServiceUrl}/${routeNumber}`);
    const routeData = routeResponse.data;

    // Fetch permit data from permit-service using permitNumber
    const permitResponse = await axios.get(`${permitServiceUrl}/${permitNumber}`);
    const permitData = permitResponse.data;

    // Check if the fetched data is valid
    if (!routeData || !permitData) {
      return res.status(400).json({ message: 'Route or Permit data not found' });
    }

    // Create a new schedule using the fetched data
    const newSchedule = new Schedule({
      scheduleId,
      departureTime,
      arrivalTime,
      startLocation: routeData.startLocation,  // From route service
      endLocation: routeData.endLocation,      // From route service
      routeNumber,                             // From request body
      routeName: routeData.routeName,          // From route service
      permitNumber,                            // From request body
      vehicleNumber: permitData.vehicleNumber, // From permit service
    });

    // Save the new schedule to the database
    await newSchedule.save();
    res.status(201).json({ message: 'Schedule created successfully', schedule: newSchedule });
  } catch (error) {
    console.error('Error creating schedule:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().select('-_id -__v');  // Exclude _id and __v
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a schedule by scheduleId
const getScheduleByScheduleId = async (req, res) => {
  const { scheduleId } = req.params;

  if (!scheduleId) {
    return res.status(400).json({ message: 'Schedule ID is required' });
  }

  try {
    const schedule = await Schedule.findOne({ scheduleId }).select('-_id -__v');  // Exclude _id and __v

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a schedule by scheduleId
const deleteScheduleByScheduleId = async (req, res) => {
  const { scheduleId } = req.params;

  if (!scheduleId) {
    return res.status(400).json({ message: 'Schedule ID is required' });
  }

  try {
    const schedule = await Schedule.findOneAndDelete({ scheduleId });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  createSchedule, 
  getAllSchedules, 
  getScheduleByScheduleId, 
  deleteScheduleByScheduleId 
};
