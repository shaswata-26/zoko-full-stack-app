import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pet: { type: String, required: true },
  category: { type: String, enum: ['General', 'Lifestyle', 'Health'], required: true },
  notes: { type: String },
  time: { type: String, required: true },
  frequency: { type: String, required: true },
  startDate: { type: Date, required: true },  // 🔁 Changed from `date` to `startDate`
  endDate: { type: Date },                     // 🔁 Optional endDate
  completed: { type: Boolean, default: false }
});

export default mongoose.model('Reminder', reminderSchema);
