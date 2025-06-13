import express from 'express';
import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder
} from '../controllers/reminderController.js';

const router = express.Router();

router.get('/', getReminders);
router.post('/', addReminder);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

export default router;
