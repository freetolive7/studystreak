const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  completedDates: {
    type: [String], // stores dates like "2026-07-14"
    default: [],
  },
  lastCompletedDate: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);