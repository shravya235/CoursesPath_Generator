import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State for handling errors
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [theme, setTheme] = useState('dark'); // Default to dark for auth pages
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate(); // Hook for navigation


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
      // Default to dark for auth pages
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    // Check for success message from localStorage
    const storedMessage = localStorage.getItem('successMessage');
    if (storedMessage) {
      setSuccessMessage(storedMessage);
      localStorage.removeItem('successMessage'); // Clear it after displaying
    }
  }, []);

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

  // --- MODIFIED HANDLE SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        // If response is not JSON (e.g., HTML error page), show generic error
        throw new Error('Server error: Unable to process response. Please try again.');
      }

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      // If login is successful (OTP sent), redirect to OTP entry page
      navigate('/otp-entry', { state: { email: formData.email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

      {/* Glassmorphism Login Card */}
      <div className={`relative z-10 backdrop-blur-lg border rounded-2xl p-4 md:p-8 w-full max-w-sm md:max-w-md lg:max-w-lg shadow-2xl ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800/50 border-cyan-700/50'}`}>
        {/* Logo and Title */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl md:text-2xl font-bold">GV</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            GyanVistara
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
              required
            />
          </div>

          {/* Success Message */}
          {successMessage && <p className="text-green-400 text-sm text-center">{successMessage}</p>}

          {/* --- ERROR MESSAGE DISPLAY --- */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        {/* Toggle Link */}
        <div className="mt-6 text-center text-sm text-black dark:text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-600 hover:text-cyan-500 font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;