// src/components/PathCard.jsx
import React from 'react';

// A simple placeholder icon component
const ArrowIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const PathCard = ({ title, tags, gradient, rotation }) => {
  return (
    <div
      className={`bg-[#0a0f23]/90 backdrop-blur-lg rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-cyan-600/60 transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)] ${rotation} -translate-y-6 relative`}
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="md:text-2xl lg:text-3xl text-3xl font-extrabold uppercase text-white drop-shadow-lg tracking-wider">{title}</h3>
        <div className={`w-12 h-12 rounded-full ${gradient} flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.6)] border-4 border-white/30`}></div>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm font-bold uppercase bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 text-transparent bg-clip-text border border-purple-400 rounded-full md:px-4 md:py-1.5 lg:px-5 lg:py-2 px-5 py-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <button className="w-full bg-gradient-electric-orange hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-white font-extrabold md:py-3 md:px-5 lg:py-4 lg:px-6 py-4 px-6 rounded-3xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-[0_0_25px_rgba(255,69,0,0.8)] hover:shadow-[0_0_50px_rgba(255,69,0,1)]">
        <span>Explore Path</span>
        <ArrowIcon />
      </button>
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-magenta-cyan rounded-full opacity-40 blur-xl animate-blob"></div>
    </div>
  );
};

export default PathCard;