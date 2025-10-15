const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Verify OTP
router.post('/verify-otp', authController.verifyOtp);

// Reset password
router.post('/reset-password', authController.resetPassword);

// Get the logged-in user
router.get('/user', authMiddleware, authController.getLoggedInUser);

module.exports = router;
