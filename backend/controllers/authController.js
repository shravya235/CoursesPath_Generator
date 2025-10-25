const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtpEmail } = require('../services/emailService');
require('dotenv').config();

// @route   POST api/auth/register
// @desc    Register a user and send OTP
// @access  Public
exports.register = async (req, res) => {
  const { name, email, password, education } = req.body;

  // Validate name
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ msg: 'Name is required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Please provide a valid email address' });
  }

  // --- ADDED: PASSWORD VALIDATION ---
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    });
  }
  // --- END OF VALIDATION ---

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      education,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP expiration to 10 minutes from now
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP to user
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.json({ msg: 'Registration successful. OTP sent to your email. Please verify to complete registration.' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
