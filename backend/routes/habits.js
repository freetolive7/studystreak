const express = require('express');
const Habit = require('../models/Habit');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Create a habit
router.post('/', protect, async (req, res) => {
  try {
    const { title } = req.body;
    const habit = new Habit({ user: req.userId, title });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all habits for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Mark a habit as done for today
router.patch('/:id/complete', protect, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    const today = new Date().toISOString().split('T')[0];

    if (habit.lastCompletedDate === today) {
      return res.status(400).json({ message: 'Already marked done today' });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (habit.lastCompletedDate === yesterdayStr) {
      habit.streak += 1;
    } else {
      habit.streak = 1;
    }

    habit.lastCompletedDate = today;
    habit.completedDates.push(today);

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a habit
router.delete('/:id', protect, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;