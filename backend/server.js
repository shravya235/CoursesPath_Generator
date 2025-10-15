// File: backend/server.js

const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- START: NEW CORS CONFIGURATION ---
// Allow multiple origins for flexibility (e.g., production, previews, localhost)
const allowedOrigins = [
  'https://gyanvistara.vercel.app',
  'https://gyanvistara-git-main-shravya.vercel.app', // Example preview URL; replace with actual if different
  'http://localhost:3000', // For local development
  'http://localhost:5173'  // Vite default dev port
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));
// --- END: NEW CORS CONFIGURATION ---

// Connect to the Database
connectDB();

// Initialize Middleware
// app.use(cors()); // We replaced this with the configuration above
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// Health check endpoint
app.get('/api/', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

app.get('/', (req, res) => {
  res.send('Backend API for GyanVistara is running!');
});

const PORT = process.env.PORT || 5000;

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
}