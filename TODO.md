# TODO: Add Forgot Password with OTP using Nodemailer

## Backend Changes
- [ ] Install nodemailer dependency in backend/package.json
- [ ] Update backend/models/User.js to add otp and otpExpiry fields
- [ ] Add new routes in backend/routes/auth.js: POST /forgot-password, POST /verify-otp, POST /reset-password
- [ ] Update backend/controllers/authController.js with forgotPassword, verifyOtp, resetPassword functions

## Frontend Changes
- [ ] Create frontend/src/pages/auth/ForgotPasswordPage.jsx with email input form matching theme
- [ ] Create frontend/src/pages/auth/ResetPasswordPage.jsx with OTP and new password inputs matching theme
- [ ] Update frontend/src/pages/auth/RegisterPage.jsx to add "Forgot Password?" link
- [ ] Update frontend/src/pages/auth/LoginPage.jsx to add "Forgot Password?" link
- [ ] Update frontend/src/App.jsx to add routes for /forgot-password and /reset-password

## Followup Steps
- [ ] Install backend dependencies (npm install)
- [ ] Set up environment variables for email (EMAIL_USER, EMAIL_PASS, etc.)
- [ ] Test OTP email sending, OTP verification, and password reset functionality
- [ ] Verify frontend pages match the dark, gradient theme of existing auth pages
