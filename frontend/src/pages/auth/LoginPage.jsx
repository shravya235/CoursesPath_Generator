import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State for handling errors
  const navigate = useNavigate(); // Hook for navigation

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

    try {
const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      // If login is successful, save the token and redirect
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      setError(err.message);
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="bg-[#0a0f23] min-h-screen text-gray-100 relative overflow-x-hidden font-sans flex items-center justify-center">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] bg-gradient-magenta-cyan opacity-20 blur-[80px] rounded-full animate-blob pointer-events-none select-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-purple-blue opacity-15 blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none"></div>

      {/* Glassmorphism Login Card */}
      <div className="relative z-10 bg-gray-800/50 backdrop-blur-lg border border-cyan-700/50 rounded-2xl p-4 md:p-8 w-full max-w-sm md:max-w-md shadow-2xl">
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
              className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
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
              className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>

          {/* --- ERROR MESSAGE DISPLAY --- */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500"
          >
            Log In
          </button>
        </form>



        {/* Toggle Link */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;