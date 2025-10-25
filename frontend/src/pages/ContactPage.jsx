import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Server error: Invalid response');
      }

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] dark:bg-[#0a0f23] min-h-screen text-gray-900 dark:text-gray-100 relative overflow-x-hidden font-sans pt-20 md:pt-24 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <main className="relative pb-16 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] bg-gradient-magenta-cyan opacity-5 dark:opacity-20 blur-[80px] rounded-full animate-blob pointer-events-none select-none"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-purple-blue opacity-5 dark:opacity-15 blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10 max-w-7xl">
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold uppercase text-gray-900 dark:text-white tracking-wide leading-tight drop-shadow-lg break-words">
            GET IN <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              TOUCH
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-sans">
            Have questions or need assistance? We're here to help you on your career journey.
          </p>
        </div>
      </main>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-cyan-700/50 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">📧</span>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">gyanvistara.web@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">📞</span>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">Phone</p>
                    <p className="text-gray-600 dark:text-gray-400">7892848220<br/>9964996717</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">📍</span>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">Address</p>
                    <p className="text-gray-600 dark:text-gray-400">NMAMIT, Nitte<br />Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-cyan-700/50 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              {success && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500 rounded-lg">
                  <p className="text-green-800 dark:text-green-400">Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500 rounded-lg">
                  <p className="text-red-800 dark:text-red-400">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-gray-200 dark:bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-gray-200 dark:bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="5"
                    className="w-full bg-gray-200 dark:bg-gray-700/50 border-0 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-electric-orange text-white font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
