const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // User's email
  },
  ground: {
    type: String,
    required: true, // Name of the ground
  },
  date: {
    type: Date,
    required: true, // Booking date
  },
  timeSlot: {
    type: String,
    required: true, // Selected time slot
  },
  createdAt: {
    type: String,
    required: true, // Timestamp when the booking was created
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
