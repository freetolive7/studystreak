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
  category: {
    type: String,
    enum: ['Coding', 'Competitive Programming', 'GitHub', 'Projects'],
    default: 'Coding',
  },
  streak: {
    type: Number,
    default: 0,
  },
  completedDates: {
    type: [String],
    default: [],
  },
  lastCompletedDate: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);