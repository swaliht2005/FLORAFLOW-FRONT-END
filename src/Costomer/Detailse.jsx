
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navebar from '../Combonents/Navebar';
import details from '../assets/images/details.jpg';
import Footer2 from '../Combonents/Footer2';
import SubscribeButton from '../Combonents/SubscribeButton';

function Detailse() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || {};
  const [count, setCount] = useState(1);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No token found, user not logged in');
          return;
        }

        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user profile (Status: ${response.status})`);
        }

        const data = await response.json();
        setUser(data.user || {});
      } catch (err) {
        console.error('Error fetching user:', err);
        setUserError('Could not load user profile.');
      }
    };
    fetchUser();
  }, []);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to your cart');
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: cart._id,
          quantity: count,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to add to cart (Status: ${response.status})`);
      }

      alert('Product added to cart successfully!');
      navigate('/addtocart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${details})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Navbar */}
      <Navebar className="fixed z-20" />

      {/* Product Card */}
      <div className="flex items-center justify-center mt-8 px-4 lg:mt-12 lg:py-14 overflow-hidden">
        {cart ? (
          <div className="w-full h-full lg:w-full max-w-4xl bg-white rounded-lg shadow-md p-3 flex flex-col items-center gap-8 lg:gap-12 mt-20 sm:mt-0">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="w-full flex justify-center items-center mb-4">
                <SubscribeButton user={user} hideSubscribe={true} id="profile-display" />
              </div>
              <img
                src={`http://localhost:5000/api/seller/${cart._id}/image`}
                alt={cart.PlantName || 'Plant Image'}
                className="rounded h-auto max-w-full lg:max-w-md object-cover shadow-sm sm:pb-0"
                onError={(e) => (e.target.src = '/fallback-image.jpg')}
              />
              <Link to="/shopemore">
                <button
                  type="button"
                  className="mt-4 text-white bg-gradient-to-br from-pin-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-auto"
                >
                  SHOP MORE
                </button>
              </Link>
            </div>

            {/* Details Section */}
            <div className="w-full p-4 text-center lg:text-left">
              <div className="w-full flex justify-center flex-col items-center">
                <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                  {cart.PlantName || 'Unknown Plant'}
                </h1>
                <p className="text-gray-600 mt-4">
                  Planting Day: {cart.PlantingDay || 'N/A'}
                </p>
                <p className="text-gray-600 mt-2">Height: {cart.PlantingHeight || 'Unknown'}</p>
                {cart.price && (
                  <p className="text-xl lg:text-2xl font-bold text-green-600 mt-4">
                    ₹{cart.price}
                  </p>
                )}
              </div>
              <p className="text-gray-600 mt-4 text-sm lg:text-base">
                About: {cart.PlantAbout || 'No description available'}
              </p>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              {userError && <p className="text-red-500 text-sm mt-4">{userError}</p>}

              {/* Actions */}
              <div className="flex flex-col gap-6 mt-8">
                {/* Quantity Selector */}
                <div className="flex justify-center sm:justify-start items-center md:justify-center gap-4">
                  <button
                    onClick={decrement}
                    className="bg-green-500 hover:bg-white text-white hover:text-black hover:border-green-500 hover:border-2 font-semibold py-2 px-4 rounded transition duration-400 ease-in-out"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <label htmlFor="quantity" className="text-lg">
                    {count}
                  </label>
                  <button
                    onClick={increment}
                    className="bg-green-500 hover:bg-white text-white hover:text-black hover:border-green-500 hover:border-2 font-semibold py-2 px-4 rounded transition duration-400 ease-in-out"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
                  <div className="w-full flex justify-center lg:w-2/3 flex-col lg:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-green-500 text-white py-2 rounded-full lg:w-32 md:w-48 w-full hover:bg-green-600 transition duration-300"
                    >
                      Add to Cart
                    </button>
                    <Link to="/buynow">
                      <button className="flex-1 lg:w-32 bg-gradient-to-r from-pin-500 to-yellow-500 text-white py-2 rounded-full md:w-48 w-full hover:bg-green-600 transition duration-300">
                        Buy Now
                      </button>
                    </Link>
                    <Link
                      to="/chatapp"
                      className="flex-1 text-center bg-blue-500 text-white py-2 rounded-full lg:w-28 md:w-48 w-full hover:bg-blue-600 transition duration-300"
                    >
                      Comment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No details available</p>
        )}
      </div>
      <Footer2 />
    </div>
  );
}

export default Detailse;
