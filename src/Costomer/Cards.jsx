


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Faverate from '../assets/images/favorites.png';

function Cards() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/seller/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data); // Debug log
        // Handle nested data or non-array responses
        const products = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
        setCarts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
        setCarts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-28">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-28">{error}</div>;
  }

  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative top-28 pb-40">
        {carts.length === 0 ? (
          <div className="text-center col-span-full">No products available</div>
        ) : (
          carts.map((cart) => (
            <Link to={`/details`} key={cart._id} state={{ cart }}>
              <div className="h-[500px] w-[250px] lg:h-[500px] ml-10 lg:w-[350px] bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between">
                <button className="h-6 w-6 self-end">
                  <Link to="/favorite">
                    <img src={Faverate} alt="Favorite" />
                  </Link>
                </button>
                <div className="flex items-center flex-col h-[250px] lg:h-[300px]">
                  <img
                    src={cart.url}
                    alt={cart.PlantName || 'Product'}
                    className="h-full w-full object-cover rounded mb-4"
                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  />
                </div>
                <h2 className="text-lg font-semibold mt-4 text-center">{cart.PlantName || 'Unknown'}</h2>
                <div className="relative left-[10px] bottom-[5px]">
                  <h2 className="text-gray-600">Planting Day: {cart.plantingDay || 'N/A'}</h2>
                  <h2 className="text-gray-600">Height: {cart.Height || 'N/A'}</h2>
                  <h1>
                    <b className="text-green-600">₹ {cart.price || 0}</b>
                  </h1>
                  <Link to={`/details`} state={{ cart }}>
                    <button className="shop-item-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Cards;