import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reminderRoutes from './routes/reminderRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const allowedOrigin = "http://localhost:5173";


app.use(cors({
  origin: allowedOrigin,
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json());

app.use('/api/reminders', reminderRoutes);



app.use(express.static(path.join(__dirname, "zoko/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "zoko/build", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {    console.log(`Server running on http://localhost:${PORT}`)

connectDB();
});
