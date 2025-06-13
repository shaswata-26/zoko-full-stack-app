Zoko Reminder App

Overview

A full-stack Reminder application built with React (Vite) frontend and Express backend.
The backend uses MongoDB to store reminders and serves the frontend build for production.

Features
1. Create, update, delete, and view reminders

2. Persistent storage using MongoDB

3. React frontend with responsive UI

4. Backend API with Express and RESTful routes

5. CORS configured for frontend-backend communication

6. Serves production frontend build statically

   
Project Structure

zoko-full-stack/
├── zoko/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── dist/             # Production build output (after running build)
│   ├── package.json
│   └── vite.config.js
├── zooco-backend/        # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── client-build/     # React production build copied here for serving
│   ├── server.js
│   └── package.json
└── README.md

Prerequisites
1. Node.js (v18+ recommended)

2. npm

3. MongoDB instance (cloud)

Setup Instructions

1. Clone the repo
   git clone <repo-url>
   cd zoko-full-stack
2. Install dependencies
   Frontend:
    cd zoko
    npm install
   Backend:
    cd ../zooco-backend
    npm install
3. Configure environment variables
   Create a .env file inside the backend folder (zooco-backend) with your MongoDB connection string:
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/reminderapp?retryWrites=true&w=majority
   PORT=5000
4. Build the frontend for production
   From the frontend directory (zoko):
   npm run build
   This generates a dist folder.

5. Copy frontend build to backend
   Copy the dist folder into the backend as client-build:
   # From zoko directory
   mv dist ../zooco-backend/client-build
6. Start the backend server
   From zooco-backend:
   node server.js
   The backend will:

     Connect to MongoDB

     Serve API routes at /api/reminders

     Serve React frontend statically from /client-build folder
API Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/reminders`     | Get all reminders  |
| POST   | `/api/reminders`     | Add a new reminder |
| PUT    | `/api/reminders/:id` | Update a reminder  |
| DELETE | `/api/reminders/:id` | Delete a reminder  |
Development Notes

  CORS is enabled only for frontend URL (http://localhost:5173)

  React app uses Vite for build and dev server

  Backend uses Express with route modularization

  Use Postman or similar tool to test API endpoints

Troubleshooting
  If you face permission issues deleting node_modules, run PowerShell as Administrator or close processes locking files.

  Ensure MongoDB connection string is correct in .env.

  Build frontend before running backend in production.



