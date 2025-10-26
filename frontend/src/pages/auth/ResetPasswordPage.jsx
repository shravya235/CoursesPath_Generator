import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP and new password
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Server error: Unable to process response. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      setStep(2);
      setCountdown(60); // Start 60-second countdown
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Password validation (same as registration)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Server error: Unable to process response. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      // Success: redirect to login with success message
      localStorage.setItem('successMessage', 'Password reset successfully! Please log in with your new password.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setResendLoading(true);

    try {
      const res = await fetch(`${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Server error: Unable to process response. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      setCountdown(60); // Start 60-second countdown
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans flex items-center justify-center transition-colors duration-500 ${theme === 'light' ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#0a0f23] text-gray-100'}`}>
      {/* Fixed Theme Toggle at Top */}
      <div className="fixed top-0 left-0 w-full bg-gray-800/80 backdrop-blur-md border-b border-cyan-700/50 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-end">
          <button
            onClick={toggleTheme}
            className="bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.8)] hover:shadow-[0_0_30px_rgba(255,69,0,1)] transition-colors duration-300"
            aria-label="Toggle Dark/Light Theme"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      {/* Animated gradient blobs */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] ${theme === 'light' ? 'bg-gradient-magenta-cyan opacity-5' : 'bg-gradient-magenta-cyan opacity-20'} blur-[80px] rounded-full animate-blob pointer-events-none select-none`}></div>
      <div className={`absolute top-20 right-10 w-72 h-72 ${theme === 'light' ? 'bg-gradient-purple-blue opacity-5' : 'bg-gradient-purple-blue opacity-15'} blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none`}></div>

      {/* Glassmorphism Reset Password Card */}
      <div className={`relative z-10 backdrop-blur-lg border rounded-2xl p-4 md:p-8 w-full max-w-sm md:max-w-md lg:max-w-lg shadow-2xl ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800/50 border-cyan-700/50'}`}>
        {/* Logo and Title */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl md:text-2xl font-bold">GV</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Reset Password
          </h2>
        </div>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-center text-xl tracking-widest ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
                maxLength="6"
                required
              />
            </div>

            {/* New Password Input */}
            <div>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            {/* Reset Password Button */}
            <button
              type="submit"
              disabled={loading || formData.otp.length !== 6}
              className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Resend OTP (only in step 2) */}
        {step === 2 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOtp}
              disabled={resendLoading || countdown > 0}
              className="text-cyan-600 hover:text-cyan-500 font-semibold disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-4 text-center text-sm text-black dark:text-gray-300">
          <Link to="/login" className="text-cyan-600 hover:text-cyan-500 font-semibold">
            Back to Login
          </Link>
        </div>

        {/* Spam Folder Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            If you don't receive the reset email, please check your spam/junk folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
