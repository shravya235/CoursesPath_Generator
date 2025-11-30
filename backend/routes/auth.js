const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Send OTP (resend)
router.post('/send-otp', authController.sendOtp);

// Verify OTP
router.post('/verify-otp', authController.verifyOtp);

// Forgot password - send OTP
router.post('/forgot-password', authController.forgotPassword);

// Reset password with OTP
router.post('/reset-password', authController.resetPassword);

// Get the logged-in user
router.get('/user', authMiddleware, authController.getLoggedInUser);

// Contact form submission
router.post('/contact', authController.sendContactMessage);

router.post('/google', authController.googleAuth);

module.exports = router;
