import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reminderRoutes from './routes/reminderRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

connectDB();

const allowedOrigin = "http://localhost:5173"; 

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());

// 3. Routes
app.use('/api/reminders', reminderRoutes);

// 4. Serve frontend from 'client-build' (should be copied from zoko/dist)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client-build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client-build", "index.html"));
});

// 5. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
