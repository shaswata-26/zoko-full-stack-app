import Reminder from '../models/Reminder.js';

export const getReminders = async (req, res) => {
  const reminders = await Reminder.find().sort({ date: 1 });
  res.json(reminders);
};

export const addReminder = async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    const saved = await newReminder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const updated = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
