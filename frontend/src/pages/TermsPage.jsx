import React from 'react';
import Navbar from '../components/Navbar';

const TermsPage = () => {
  return (
    <div className="bg-[#F9FAFB] dark:bg-[#0a0f23] min-h-screen text-gray-900 dark:text-gray-100 relative overflow-x-hidden font-sans pt-20 md:pt-24 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <main className="relative pb-16 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[28rem] bg-gradient-magenta-cyan opacity-5 dark:opacity-20 blur-[80px] rounded-full animate-blob pointer-events-none select-none"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-purple-blue opacity-5 dark:opacity-15 blur-[60px] rounded-full animate-blob-delayed pointer-events-none select-none"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10 max-w-7xl">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl md:text-2xl font-bold">GV</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            GyanVistara
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold uppercase text-gray-900 dark:text-white tracking-wide leading-tight drop-shadow-lg break-words mt-6">
            TERMS AND <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              CONDITIONS
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-sans">
            Please read our terms and conditions carefully before using our service.
          </p>
        </div>
      </main>

      {/* Terms Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-white dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-cyan-700/50 shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms and Conditions</h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                Welcome to GyanVistara. These terms and conditions outline the rules and regulations for the use of our website and services.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h3>
              <p>
                By accessing this website, you accept these terms and conditions. If you do not agree to be bound by these terms, you should not use this website.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">2. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials on GyanVistara's website for personal, non-commercial transitory viewing only.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">3. Disclaimer</h3>
              <p>
                The materials on GyanVistara's website are provided on an 'as is' basis. GyanVistara makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">4. Limitations</h3>
              <p>
                In no event shall GyanVistara or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GyanVistara's website, even if GyanVistara or a GyanVistara authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">5. Accuracy of Materials</h3>
              <p>
                The materials appearing on GyanVistara's website could include technical, typographical, or photographic errors. GyanVistara does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">6. Links</h3>
              <p>
                GyanVistara has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by GyanVistara of the site.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">7. Modifications</h3>
              <p>
                GyanVistara may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">8. Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
