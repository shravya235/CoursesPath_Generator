import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const OtpEntryPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

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
  }, [email, navigate]);

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

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
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

      // OTP verification successful, save message to localStorage and redirect to login page
      localStorage.setItem('successMessage', 'Email verified successfully! Please log in.');
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
      const res = await fetch(`${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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

      {/* Glassmorphism OTP Card */}
      <div className={`relative z-10 backdrop-blur-lg border rounded-2xl p-4 md:p-8 w-full max-w-sm md:max-w-md lg:max-w-lg shadow-2xl ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800/50 border-cyan-700/50'}`}>
        {/* Logo and Title */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl md:text-2xl font-bold">GV</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Enter OTP
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            We've sent a 6-digit code to {email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-center text-xl tracking-widest ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
              maxLength="6"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {/* Resend OTP */}
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

        {/* Back to Login */}
        <div className="mt-4 text-center text-sm text-black dark:text-gray-300">
          <Link to="/login" className="text-cyan-600 hover:text-cyan-500 font-semibold">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpEntryPage;
