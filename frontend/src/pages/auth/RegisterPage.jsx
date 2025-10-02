// src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import CustomSelect from '../../components/CustomSelect'; // Corrected import path

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    agree: false,
  });

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
  };

  return (
    <div className="bg-[#0a0f23] min-h-screen text-gray-100 relative overflow-x-hidden font-sans flex items-center justify-center">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] bg-gradient-magenta-cyan opacity-20 blur-[80px] rounded-full animate-blob pointer-events-none select-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-purple-blue opacity-15 blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none"></div>

      {/* Glassmorphism Register Card */}
      <div className="relative z-10 bg-gray-800/50 backdrop-blur-lg border border-cyan-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">GV</span>
          </div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
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
              className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
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
              className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>

          {/* Education Dropdown */}
          <CustomSelect
            options={educationOptions}
            value={formData.education}
            onChange={handleEducationChange}
            placeholder="Select Education Level"
          />

          {/* Terms Checkbox */}
          <div className="flex items-center">
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
              className={`w-5 h-5 rounded border-2 border-cyan-500 flex items-center justify-center cursor-pointer transition-all ${
                formData.agree ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-transparent'
              }`}
            >
              {formData.agree && <span className="text-white text-xs">✓</span>}
            </label>
            <span className="ml-3 text-sm text-gray-300">
              I agree to the <a href="#" className="text-cyan-400 hover:underline">terms and conditions</a>
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500"
          >
            Register
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-gray-700/50 text-white py-3 px-4 rounded-lg border border-transparent hover:border-cyan-500 transition-all flex items-center justify-center">
            <FcGoogle className="mr-2 text-2xl" /> Login with Google
          </button>
          <button className="w-full bg-gray-700/50 text-white py-3 px-4 rounded-lg border border-transparent hover:border-cyan-500 transition-all flex items-center justify-center">
            <FaGithub className="mr-2 text-2xl" /> Login with Github
          </button>
        </div>

        {/* Toggle Link */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Have an account already?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;