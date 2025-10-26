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
    <div className="bg-gray-100 rounded-xl p-4 sm:p-6 border border-gray-300 shadow-lg"> {/* Light theme bg/border */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Career Paths</h2> {/* Light theme text */}
      <div className="space-y-2">
        {displayPaths.map((path) => {
          // Check if the current path matches the search term OR if no search is active
          const isMatching = !isFiltered || path.name.toLowerCase().includes(searchTerm.toLowerCase());

          return (
            <button
              key={path.id}
              onMouseEnter={() => isMatching && onPathHover(path)} // Only allow hover selection if matching
              onClick={() => isMatching && onPathHover(path)} // Only allow click selection if matching
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                selectedPath?.id === path.id && isMatching // Highlight only if selected AND matching/visible
                  ? 'bg-cyan-100 ring-1 ring-cyan-500 text-cyan-700' // Light theme selected
                  : isMatching
                  ? 'text-gray-700 hover:bg-gray-200' // Light theme default/hover
                  : 'text-gray-400 opacity-50 cursor-not-allowed' // Style for non-matching items during search
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
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-2xl h-full flex items-center justify-center"> {/* Light theme bg/border */}
            <p className="text-gray-500">Hover over or search for a career path to see details.</p> {/* Adjusted text */}
        </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-2xl"> {/* Light theme bg/border */}
      <div className="flex items-center mb-4">
        <div className="text-cyan-600 mr-4"> {/* Light theme icon color */}
          {path.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{path.name}</h3> {/* Light theme text */}
      </div>
      <p className="text-gray-700 mb-6">{path.description}</p> {/* Light theme text */}
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
        <div className="bg-white min-h-screen flex items-center justify-center text-light-text"> {/* Light theme loading */}
            <p>Loading your dashboard...</p>
        </div>
    );
  }

  // Main component render
  return (
    // Enforce light theme background and text color
    <div className="bg-[#F9FAFB] min-h-screen text-gray-900 pt-20"> {/* */}
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8">

        {/* Welcome Message */}
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900"> {/* Light theme text */}
                Welcome, <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">{user.name}!</span>
            </h1>
            <p className="text-gray-700 mt-2">Let's find the perfect career path for you.</p> {/* Light theme text */}
        </div>

        {/* Search Bar */}
        <div className="text-center mb-8">
          <div className="relative w-full max-w-md mx-auto px-4 sm:px-0">
            <input
              type="text"
              placeholder="Search career paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // Light theme styling for search input
              className="w-full pl-12 pr-4 py-3 bg-gray-200 rounded-full border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} /> {/* Adjusted icon position */}
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
