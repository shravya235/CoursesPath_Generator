// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen w-full bg-light-bg dark:bg-[#0a0f23] text-light-text dark:text-gray-100 pt-20 p-8">
        <h1 className="text-5xl font-bold text-center">Welcome to your Dashboard!</h1>
        {/* You can add more dashboard components here later */}
      </main>
    </>
  );
};

export default Dashboard;
