const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Password is only required if the user did NOT sign up with Google
    required: function () { return !this.googleId; }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple users to have null googleId (email users)
  },
  education: {
    type: String,
    default: 'Not Specified', // Default for Google users
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: {
    type: Number
  },
  chatbotRequestsToday: {
    type: Number,
    default: 0,
  },
  lastRequestDate: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);