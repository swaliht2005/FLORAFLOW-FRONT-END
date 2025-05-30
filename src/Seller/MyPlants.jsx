import React, { useState, useEffect } from 'react';
import Navebar from '../Combonents/Navebar';
import Footer2 from '../Combonents/Footer2';
import Sidebar from '../Combonents/Sidebar';
import Cards from '../Costomer/Cards';
import { useNavigate, Link } from 'react-router-dom';

function MyPlants() {
  const [userPlants, setUserPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPlants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please log in to view your plants');
        }

        console.log('Fetching myplants with token:', token.slice(0, 10) + '...');
        const response = await fetch('http://localhost:5000/api/seller/myplants', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Server error (Status: ${response.status})`);
        }

        const products = await response.json();
        console.log('Fetched products:', products.length);
        setUserPlants(products);
      } catch (err) {
        console.error('Error fetching user plants:', err.message, err.stack);
        if (err.message.includes('log in') || err.message.includes('Authentication') || err.message.includes('Invalid token')) {
          setError('Please log in to view your plants');
          navigate('/login');
        } else {
          setError(err.message || 'Failed to load your plants. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlants();
  }, [navigate]);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen">
      <Navebar toggleSidebar={toggleSidebar} id="z-20" />
      <div className="flex flex-col md:flex-row">
       
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>
        )}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 md:ml-64">
          <div className="container mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-600 text-base sm:text-lg font-semibold py-6 sm:p-10">
                {error}
                <button
                  className="mt-2 sm:mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : userPlants.length === 0 ? (
              <div className="text-center text-gray-600 py-6 sm:p-10 text-base sm:text-lg">
                You haven't added any plants yet.
                <Link
                  to="/addproduct"
                  className="mt-2 sm:mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Add a Plant
                </Link>
              </div>
            ) : (
              <Cards edit="block" delt="block" carts={userPlants} />
            )}
          </div>
        </main>
      </div>
      <Footer2 id="z-20 "  />
    </div>
  );
}

export default MyPlants;