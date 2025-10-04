const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Get the logged-in user
router.get('/user', authMiddleware, authController.getLoggedInUser);

module.exports = router;