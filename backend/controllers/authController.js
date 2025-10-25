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

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ msg: 'Please verify your email first' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   POST api/auth/send-otp
// @desc    Send OTP to user
// @access  Public
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

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

    res.json({ msg: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   POST api/auth/verify-otp
// @desc    Verify OTP
// @access  Public
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ msg: 'OTP expired' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ msg: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   GET api/auth/user
// @desc    Get logged in user
// @access  Private
exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   POST api/auth/contact
// @desc    Send contact message
// @access  Public
exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Please provide a valid email address' });
  }

  try {
    // Send contact email
    const { sendContactEmail } = require('../services/emailService');
    await sendContactEmail(name, email, message);

    res.json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending contact message:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
