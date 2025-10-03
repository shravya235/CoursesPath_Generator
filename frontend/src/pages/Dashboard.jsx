// FILE: src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBusinessTime,
  FaTruck,
  FaStethoscope,
  FaUserMd,
  FaUniversity,
  FaHardHat,
  FaGavel,
  FaPenNib,
  FaShieldAlt,
  FaSearch,
} from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs'; // Corrected Icon Import
import { HiUserCircle } from 'react-icons/hi';
import Navbar from '../components/Navbar';

const educationalPaths = [
  { id: 'business', name: 'Business', icon: <FaBusinessTime size={50} />, description: 'Learn the fundamentals of management, finance, marketing, and operations to lead in the corporate world.' },
  { id: 'logistics', name: 'Logistics', icon: <FaTruck size={50} />, description: 'Master the art of supply chain management, from procurement and warehousing to transportation and delivery.' },
  { id: 'medical', name: 'Medical', icon: <FaStethoscope size={50} />, description: 'Embark on a journey to heal and care for others, from general practice to specialized surgery.' },
  { id: 'doctor', name: 'Doctor', icon: <FaUserMd size={50} />, description: 'Pursue the noble profession of medicine to diagnose, treat, and prevent human diseases and injuries.' },
  { id: 'pharmacy', name: 'Pharmacy', icon: <FaUniversity size={50} />, description: 'Become an expert in medicines and their effects, ensuring safe and effective treatment for patients.' },
  { id: 'engineering', name: 'Engineering', icon: <FaHardHat size={50} />, description: 'Design, build, and maintain engines, machines, structures, and more. A vast field with numerous specializations.' },
  { id: 'law', name: 'Law', icon: <FaGavel size={50} />, description: 'Understand the legal system, advocate for justice, and navigate the complexities of legislation.' },
  { id: 'design', name: 'Design', icon: <FaPenNib size={50} />, description: 'Unleash your creativity in fields like graphic design, UX/UI, fashion, or industrial design.' },
  { id: 'police', name: 'Police', icon: <FaShieldAlt size={50} />, description: 'Serve and protect the community by enforcing laws, responding to emergencies, and ensuring public safety.' },
  { id: 'architecture', name: 'Architecture', icon: <BsBuilding size={50} />, description: 'Plan and design buildings and physical structures, blending art and science to create functional spaces.' }, // Corrected Icon Usage
];

const PathList = ({ paths, selectedPath, onPathHover }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-cyan-700/50 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Career Paths</h2>
      <div className="space-y-2">
        {paths.map((path) => (
          <button
            key={path.id}
            onMouseEnter={() => onPathHover(path)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
              selectedPath?.id === path.id
                ? 'bg-cyan-500/20 ring-1 ring-cyan-500 text-cyan-700 dark:text-cyan-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
            }`}
          >
            {path.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const PathPreviewCard = ({ path }) => {
  if (!path) {
    return (
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 border border-cyan-700/50 shadow-lg h-full flex items-center justify-center">
            <p className="text-gray-400">Hover over a career path to see details.</p>
        </div>
    );
  }

  return (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 border border-cyan-700/50 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="text-cyan-400 mr-4">
          {path.icon}
        </div>
        <h3 className="text-2xl font-bold text-white">{path.name}</h3>
      </div>
      <p className="text-gray-300 mb-6">{path.description}</p>
      <Link
        to={`/path/${path.id}`}
        className="inline-block bg-gradient-electric-orange text-white font-extrabold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Explore
      </Link>
    </div>
  );
};

const Dashboard = () => {
  const [selectedPath, setSelectedPath] = useState(() => educationalPaths.find(p => p.id === 'engineering') || educationalPaths[0]);

  return (
    <div className="bg-white dark:bg-[#0a0f23] min-h-screen text-gray-900 dark:text-gray-100 pt-20 transition-colors duration-500">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <div className="relative w-full max-w-md mx-auto px-4 sm:px-0">
            <input
              type="text"
              placeholder="Search career paths..."
              className="w-full pl-12 pr-4 py-3 bg-gray-200 dark:bg-gray-800 backdrop-blur-lg rounded-full border border-cyan-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PathList paths={educationalPaths} selectedPath={selectedPath} onPathHover={setSelectedPath} />
          </div>
          <div className="lg:col-span-2 xl:col-span-3">
            <PathPreviewCard path={selectedPath} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;