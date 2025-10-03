// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // ... (your existing theme logic remains unchanged) ...
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
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
    <header className="fixed top-0 left-0 w-full bg-light-navbar-bg dark:bg-[#0a0f23] z-50 border-b border-cyan-700/50 shadow-lg shadow-cyan-900/50 filter-none">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="md:text-2xl lg:text-3xl text-3xl font-extrabold uppercase tracking-widest select-none flex items-center space-x-2">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
            Gyan Vistara
          </span>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-light-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 z-50">
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
        <div className="hidden md:flex items-center md:space-x-6 lg:space-x-10">
          {/* Update the hrefs for Home and About */}
          <a href="#home" className="text-light-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-semibold tracking-wide">
            Home
          </a>
          <a href="#about" className="text-light-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-semibold tracking-wide">
            About
          </a>
          <a href="#" className="text-light-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-semibold tracking-wide">
            Contact
          </a>
        </div>
        <div className="hidden md:flex items-center md:space-x-2 lg:space-x-4">
          <button
            onClick={toggleTheme}
            className="bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.8)] hover:shadow-[0_0_30px_rgba(255,69,0,1)] transition-colors duration-300"
            aria-label="Toggle Dark/Light Theme"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <Link
            to="/login"
            className="bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-2 px-8 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.8)] hover:shadow-[0_0_30px_rgba(255,69,0,1)] transition-colors duration-300 inline-block text-center"
          >
            Login
          </Link>
        </div>
      </nav>
      {menuOpen && <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setMenuOpen(false)}></div>}
      <div
        className={`fixed top-0 right-0 w-64 sm:w-72 md:w-80 h-full bg-white dark:bg-[#0a0f23] backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out filter-none ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
          {/* Logo and Name Section */}
          <div
            className="flex items-center justify-center py-6 px-4 border-b border-gray-300 dark:border-gray-700"
            id="mobile-menu-title"
          >
            <span className="text-xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Gyan Vistara
            </span>
          </div>
          {/* Menu Items */}
          <div className="flex-1 px-6 py-4 flex flex-col space-y-8 overflow-y-auto">
            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="text-light-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-semibold tracking-wide"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="text-light-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-semibold tracking-wide"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-light-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-semibold tracking-wide"
            >
              Contact
            </a>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className="bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.8)] hover:shadow-[0_0_30px_rgba(255,69,0,1)] transition-colors duration-300"
                aria-label="Toggle Dark/Light Theme"
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-2 px-8 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.8)] hover:shadow-[0_0_30px_rgba(255,69,0,1)] transition-colors duration-300 inline-block text-center"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;