import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PathCard from '../components/PathCard';
import AboutSection from '../components/AboutSection';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#about') {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  // --- Add IDs matching the routes ---
  const paths = [
    { id: 'engineering', title: 'Engineering', tags: ['PCM Required', '4-Year B.Tech', 'Top Colleges'], gradient: 'bg-gradient-magenta-cyan', rotation: 'md:rotate-2' },
    { id: 'medical', title: 'Medical', tags: ['Exam: NEET', '5-Year MBBS', 'High Demand'], gradient: 'bg-gradient-purple-blue', rotation: 'md:-rotate-2' },
    { id: 'law', title: 'Law', tags: ['CLAT Exam', '5-Year LLB', 'Corporate Law'], gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500', rotation: 'md:rotate-1' },
  ];
  // --- ---

  return (
    <div className="bg-light-bg dark:bg-[#0a0f23] min-h-screen text-light-text dark:text-gray-100 relative overflow-x-hidden font-sans pt-20 md:pt-24">
      <Navbar />

      {/* Hero Section with id="home" */}
      <main id="home" className="relative pb-16 overflow-hidden">
        {/* ... (rest of your hero section code remains unchanged) ... */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] bg-gradient-magenta-cyan opacity-20 blur-[80px] rounded-full animate-blob pointer-events-none select-none"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-purple-blue opacity-15 blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10 max-w-7xl">
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold uppercase text-light-text dark:text-white tracking-wide leading-tight drop-shadow-lg break-words">
            FIND YOUR <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              CAREER ROADMAP
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-light-text dark:text-gray-300 max-w-3xl mx-auto font-sans">
            Get accurate, actionable educational paths tailored just for you. Your future starts here.
          </p>
          <Link to="/dashboard" className="mt-12 inline-block bg-gradient-electric-orange text-white font-extrabold uppercase text-sm sm:text-lg md:text-xl py-3 px-8 sm:py-4 sm:px-12 md:py-5 md:px-14 rounded-full shadow-[0_0_20px_#FF5733,0_0_40px_#FF5733] animate-glow transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_#FF5733,0_0_80px_#FF5733] hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500">
            Find My Path
          </Link>
        </div>
      </main>

      {/* Tilted Card Grid Section */}
      <section className="py-24 -mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
            {/* --- Wrap each card in a Link --- */}
            {paths.map((path, index) => (
              <Link key={index} to={`/path/${path.id}`} className="block"> {/* Add Link here */}
                <PathCard
                  title={path.title}
                  tags={path.tags}
                  gradient={path.gradient}
                  rotation={path.rotation}
                />
              </Link>
            ))}
            {/* --- --- */}
          </div>
        </div>
      </section>

      <div id="about">
        <AboutSection />
      </div>
    </div>
  );
};

export default HomePage;
