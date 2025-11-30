import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomSelect from '../../components/CustomSelect';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import GoogleAuthButton from '../../components/GoogleAuthButton';

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
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else {
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

  const handleGoogleSuccess = async (tokenResponse) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenResponse.access_token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Google signup failed');

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEducationChange = (value) => {
    setFormData({ ...formData, education: value });
    if (value !== 'other') setCustomEducation('');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          education: formData.education === 'other' ? customEducation : formData.education,
        }),
      });

      let data;
      try { data = await res.json(); } catch { throw new Error('Server error'); }

      if (!res.ok) throw new Error(data.msg || 'Something went wrong');

      navigate('/otp-entry', { state: { email: formData.email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full relative font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-500 overflow-x-hidden ${theme === 'light' ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#0a0f23] text-gray-100'}`}>
      
      {/* Theme Toggle */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="container mx-auto px-6 py-4 flex justify-end">
          <button onClick={toggleTheme} className="pointer-events-auto bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300 text-sm">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      {/* Background Effects */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] ${theme === 'light' ? 'bg-gradient-magenta-cyan opacity-5' : 'bg-gradient-magenta-cyan opacity-20'} blur-[80px] rounded-full animate-blob pointer-events-none select-none`}></div>
      <div className={`fixed top-20 right-10 w-72 h-72 ${theme === 'light' ? 'bg-gradient-purple-blue opacity-5' : 'bg-gradient-purple-blue opacity-15'} blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none`}></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className={`backdrop-blur-lg border rounded-2xl py-8 px-4 sm:px-10 shadow-2xl ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800/50 border-cyan-700/50'}`}>
          
          {/* Logo Section */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">GV</span>
            </div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              GyanVistara
            </h2>
          </div>

          {/* Form - Compact Spacing */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={`w-full border-0 rounded-lg px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`} required />
            
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={`w-full border-0 rounded-lg px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`} required />
            
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className={`w-full border-0 rounded-lg px-4 py-2.5 pr-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute inset-y-0 right-0 px-3 flex items-center ${theme === 'light' ? 'text-gray-500 hover:text-cyan-600' : 'text-gray-400 hover:text-cyan-300'}`}>
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>

            <div className="relative">
              <CustomSelect options={educationOptions} value={formData.education} onChange={handleEducationChange} placeholder="Select Education Level" />
            </div>

            {formData.education === 'other' && (
              <input type="text" value={customEducation} onChange={handleCustomEducationChange} placeholder="Please specify" className={`w-full border-0 rounded-lg px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700/50 text-gray-100'}`} required />
            )}

            <div className="flex items-start">
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="hidden" id="agree" />
              <label htmlFor="agree" className={`w-5 h-5 rounded border-2 border-cyan-500 flex items-center justify-center cursor-pointer transition-all mt-0.5 ${formData.agree ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-transparent'}`}>{formData.agree && <span className="text-white text-xs">✓</span>}</label>
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-300 leading-tight">I agree to the <Link to="/terms" className="text-cyan-500 hover:underline">terms</Link></span>
            </div>

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}

            <button type="submit" disabled={loading} className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-sm py-3 px-6 rounded-full shadow-lg animate-glow transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${theme === 'light' ? 'bg-white text-gray-500' : 'bg-gray-800 text-gray-400'}`}>
                Or
              </span>
            </div>
          </div>

          {/* Google Button - MOVED HERE */}
          <div className="mb-4">
            <GoogleAuthButton 
              text="Sign up with Google"
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Signup Failed')}
            />
          </div>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Have an account? <Link to="/login" className="text-cyan-500 hover:text-cyan-400 font-semibold">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;