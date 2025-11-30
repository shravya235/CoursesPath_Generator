// File: backend/server.js

const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

// 1. INITIALIZE APP FIRST (Critical Step)
const app = express();

// 2. CORS CONFIGURATION
// Define allowed origins
const allowedOrigins = [
  'https://gyanvistara.vercel.app',
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

// 3. DATABASE CONNECTION
connectDB();

// 4. MIDDLEWARE
app.use(express.json({ limit: '10mb' })); // Increase limit for potential large payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For form data

// 5. ROUTES (Must come after 'app' is initialized)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chatbot', require('./routes/chatbot')); // <--- Chatbot route

// 6. HEALTH CHECK
app.get('/api/', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

app.get('/', (req, res) => {
  res.send('Backend API for GyanVistara is running!');
});

// 7. ERROR HANDLING
// Global error handler to ensure JSON responses
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ msg: 'Server error' });
});

// 8. START SERVER
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
}

module.exports = app;