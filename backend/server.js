const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- Add CORS Options ---
const corsOptions = {
  origin: 'https://gyanvistara.vercel.app',
  optionsSuccessStatus: 200
};

// Connect to the Database
connectDB();

// Initialize Middleware
app.use(cors(corsOptions));
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