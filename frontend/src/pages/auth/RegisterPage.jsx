// src/pages/auth/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomSelect from '../../components/CustomSelect';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    education: '',
    agree: false,
  });
  const [customEducation, setCustomEducation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState('dark'); // Default to dark for auth pages
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
      // Default to dark for auth pages
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
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

  const educationOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'pre-university', label: 'Pre-University' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEducationChange = (value) => {
    setFormData({ ...formData, education: value });
    if (value !== 'other') {
      setCustomEducation('');
    }
  };

  const handleCustomEducationChange = (e) => {
    setCustomEducation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.agree) {
      setError('You must agree to the terms and conditions.');
      setLoading(false);
      return;
    }

    if (formData.education === 'other' && !customEducation.trim()) {
      setError('Please specify your education level.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          education: formData.education === 'other' ? customEducation : formData.education,
        }),
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

      // If registration is successful (OTP sent), redirect to OTP entry page
      navigate('/otp-entry', { state: { email: formData.email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerified = () => {
    // After OTP verification, redirect directly to dashboard
    navigate('/dashboard');
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

      {/* Glassmorphism Register Card */}
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
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
              required
            />
          </div>

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

          {/* Password Input with eye icon */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full border-0 rounded-lg px-4 py-3 pr-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 px-3 flex items-center ${theme === 'light' ? 'text-gray-500 hover:text-cyan-600' : 'text-gray-400 hover:text-cyan-300'}`}
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </div>

          {/* Education Dropdown */}
          <CustomSelect
            options={educationOptions}
            value={formData.education}
            onChange={handleEducationChange}
            placeholder="Select Education Level"
          />

          {/* Custom Education Input */}
          {formData.education === 'other' && (
            <div>
              <input
                type="text"
                value={customEducation}
                onChange={handleCustomEducationChange}
                placeholder="Please specify your education level"
                className={`w-full border-0 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`}
                required
              />
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="hidden"
              id="agree"
            />
            <label
              htmlFor="agree"
              className={`w-5 h-5 rounded border-2 border-cyan-500 flex items-center justify-center cursor-pointer transition-all mt-0.5 ${
                formData.agree ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-transparent'
              }`}
            >
              {formData.agree && <span className="text-white text-xs">✓</span>}
            </label>
            <span className="ml-2 md:ml-3 text-xs md:text-sm text-black dark:text-gray-300 leading-tight">
              I agree to the <Link to="/terms" className="text-cyan-400 hover:underline">terms and conditions</Link>
            </span>
          </div>

          {/* Error Message Display */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF533,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Toggle Link */}
        <div className="mt-6 text-center text-sm text-black dark:text-gray-300">
          Have an account already?{' '}
          <Link to="/login" className="text-cyan-600 hover:text-cyan-500 font-semibold">
            Log In
          </Link>
        </div>

        {/* Spam Folder Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            If you don't receive the verification email, please check your spam/junk folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
