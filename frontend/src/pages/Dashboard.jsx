import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
import { BsBuilding } from 'react-icons/bs';
import Navbar from '../components/Navbar';

const educationalPaths = [
  { id: 'business', name: 'Business', icon: <FaBusinessTime size={50} />, description: 'Learn the fundamentals of management, finance, marketing, and operations to lead in the corporate world.' },
  { id: 'logistics', name: 'Logistics', icon: <FaTruck size={50} />, description: 'Master the art of supply chain management, from procurement and warehousing to transportation and delivery.' },
  { id: 'medical', name: 'Medical', icon: <FaStethoscope size={50} />, description: 'Embark on a journey to heal and care for others, from general practice to specialized surgery.' },
  { id: 'pharmacy', name: 'Pharmacy', icon: <FaUniversity size={50} />, description: 'Become an expert in medicines and their effects, ensuring safe and effective treatment for patients.' },
  { id: 'engineering', name: 'Engineering', icon: <FaHardHat size={50} />, description: 'Design, build, and maintain engines, machines, structures, and more. A vast field with numerous specializations.' },
  { id: 'law', name: 'Law', icon: <FaGavel size={50} />, description: 'Understand the legal system, advocate for justice, and navigate the complexities of legislation.' },
  { id: 'design', name: 'Design', icon: <FaPenNib size={50} />, description: 'Unleash your creativity in fields like graphic design, UX/UI, fashion, or industrial design.' },
  { id: 'police', name: 'Police', icon: <FaShieldAlt size={50} />, description: 'Serve and protect the community by enforcing laws, responding to emergencies, and ensuring public safety.' },
  { id: 'architecture', name: 'Architecture', icon: <BsBuilding size={50} />, description: 'Plan and design buildings and physical structures, blending art and science to create functional spaces.' },
];

const PathList = ({ paths, selectedPath, onPathHover, searchTerm }) => {
  // Determine if the full list is showing (no search term) or if it's filtered
  const isFiltered = searchTerm.trim().length > 0;

  // Decide which paths to display based on whether filtering is active
  const displayPaths = isFiltered ? paths : educationalPaths; // Show all if not searching

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-300 dark:border-gray-600 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Career Paths</h2>
      <div className="space-y-2">
        {displayPaths.map((path) => {
          // Check if the current path matches the search term OR if no search is active
          const isMatching = !isFiltered || path.name.toLowerCase().includes(searchTerm.toLowerCase());

          return (
            <button
              key={path.id}
              onMouseEnter={() => isMatching && onPathHover(path)} // Only allow hover selection if matching
              onClick={() => isMatching && onPathHover(path)} // Only allow click selection if matching
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedPath?.id === path.id && isMatching // Highlight only if selected AND matching/visible
                ? 'bg-cyan-100 dark:bg-cyan-800 ring-1 ring-cyan-500 text-cyan-700 dark:text-cyan-300'
                : isMatching
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'text-gray-400 dark:text-gray-500 opacity-50 cursor-not-allowed'
                }`}
              disabled={!isMatching} // Disable button if it doesn't match search
            >
              {path.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};


const PathPreviewCard = ({ path }) => {
  if (!path) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-600 shadow-2xl h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Hover over or search for a career path to see details.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-600 shadow-2xl">
      <div className="flex items-center mb-4">
        <div className="text-cyan-600 dark:text-cyan-400 mr-4">
          {path.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{path.name}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{path.description}</p>
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
  // Set initial selected path explicitly, e.g., 'medical'
  const [selectedPath, setSelectedPath] = useState(() => educationalPaths.find(p => p.id === 'medical') || educationalPaths[0]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Calculate filtered paths based on the search term
  const filteredPaths = educationalPaths.filter(path =>
    path.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Effect to handle token from URL (e.g., after OAuth redirects)
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      navigate('/dashboard', { replace: true }); // Remove token from URL
    }
  }, [searchParams, navigate]);

  // Effect to update the selected path when the search term changes
  // It selects the first item from the filtered list automatically
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // If search is cleared, you might want to reset to a default or keep the last selected
      setSelectedPath(educationalPaths.find(p => p.id === 'medical') || educationalPaths[0]); // Reset to initial default
    } else if (filteredPaths.length > 0) {
      // If there are results, select the first one
      setSelectedPath(filteredPaths[0]);
    } else {
      // If no results, clear the selection
      setSelectedPath(null);
    }
  }, [searchTerm]); // Rerun only when searchTerm changes

  // Effect to fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api/auth/user`, { //
          method: 'GET',
          headers: {
            'x-auth-token': token, // Send token in header
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await res.json();
        setUser(userData); // Set user state
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login'); // Redirect to login on error
      }
    };

    fetchUserData();
  }, [navigate]); // Rerun if navigate function changes (shouldn't happen often)

  // Loading state while fetching user data
  if (!user) {
    return (
      <div className="bg-light-bg dark:bg-[#0a0f23] min-h-screen flex items-center justify-center text-light-text dark:text-gray-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-magenta-cyan opacity-20 blur-[80px] rounded-full animate-blob"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-purple-blue opacity-15 blur-[60px] rounded-full animate-blob-delayed"></div>
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 blur-[50px] rounded-full animate-blob" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-15 blur-[40px] rounded-full animate-blob-delayed" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-transparent border-t-gradient-magenta-cyan border-r-gradient-purple-blue rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            Loading Your Dashboard
          </h2>
          <p className="text-lg text-light-text dark:text-gray-300">
            Preparing your personalized career roadmap...
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-gradient-magenta-cyan rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-purple-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    // Support both light and dark themes
    <div className="bg-[#F9FAFB] dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 pt-20"> {/* */}
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8">

        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Welcome, <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">{user.name}!</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Let's find the perfect career path for you.</p>
        </div>

        {/* Search Bar */}
        <div className="text-center mb-8">
          <div className="relative w-full max-w-md mx-auto px-4 sm:px-0">
            <input
              type="text"
              placeholder="Search career paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PathList
              paths={educationalPaths} // Pass full list for display logic inside
              selectedPath={selectedPath}
              onPathHover={setSelectedPath} // Allows hover/click to update selection
              searchTerm={searchTerm} // Pass search term for filtering display
            />
          </div>
          {/* Preview Card */}
          <div className="lg:col-span-2 xl:col-span-3">
            <PathPreviewCard path={selectedPath} /> {/* Display the currently selected path */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
