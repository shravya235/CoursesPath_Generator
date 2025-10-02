// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // On mount, check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
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

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0a0f23]/90 backdrop-blur-lg z-50 border-b border-cyan-700/50 shadow-lg shadow-cyan-900/50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-extrabold uppercase tracking-widest select-none">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
            Gyan Vistara
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold tracking-wide">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold tracking-wide">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold tracking-wide">
            Paths
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.8)] hover:shadow-[0_0_30px_rgba(255,69,0,1)] transition-colors duration-300"
            aria-label="Toggle Dark/Light Theme"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button className="bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-2 px-8 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.8)] hover:shadow-[0_0_30px_rgba(255,69,0,1)] transition-colors duration-300">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
