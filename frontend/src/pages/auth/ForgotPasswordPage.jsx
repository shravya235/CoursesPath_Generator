import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
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

      setMessage(data.msg);
      // Navigate to reset password page with email
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0f23] min-h-screen text-gray-100 relative overflow-x-hidden font-sans flex items-center justify-center">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] bg-gradient-magenta-cyan opacity-20 blur-[80px] rounded-full animate-blob pointer-events-none select-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-purple-blue opacity-15 blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none"></div>

      {/* Glassmorphism Forgot Password Card */}
      <div className="relative z-10 bg-gray-800/50 backdrop-blur-lg border border-cyan-700/50 rounded-2xl p-4 md:p-8 w-full max-w-sm md:max-w-md shadow-2xl">
        {/* Logo and Title */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl md:text-2xl font-bold">GV</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Forgot Password
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>

          {/* Error Message Display */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Success Message Display */}
          {message && <p className="text-green-400 text-sm text-center">{message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF533,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Remember your password?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
