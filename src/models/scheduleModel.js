// src/models/scheduleModel.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  scheduleId: { type: Number, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  routeName: { type: String, required: true },
  routeNumber: { type: String, required: true },  // Added routeNumber field
  permitNumber: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
});

// Automatically remove _id and __v from response
scheduleSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
