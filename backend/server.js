const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to the Database
connectDB();

// Initialize Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(` Server started on port ${PORT}`));