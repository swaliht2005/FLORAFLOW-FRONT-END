
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import Faverate from '../assets/images/favorites.png';
import SubscribeButton from '../Combonents/SubscribeButton';

function Cards({ edit = '', delt = '' }) {
  const [carts, setCarts] = useState([]);
  const [filteredCarts, setFilteredCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useSearch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Featured');
  const [filters, setFilters] = useState({
    typeOfPlants: '',
    priceRange: '',
    light: '',
    idealPlantsLocation: '',
    indoorOutdoor: '',
    maintenance: '',
    potSize: '',
    waterSchedule: '',
    color: '',
    size: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5000/api/seller${
          searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''
        }`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const products = await response.json();
        setCarts(products);
        setFilteredCarts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
        setCarts([]);
        setFilteredCarts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/seller/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      setCarts(carts.filter((cart) => cart._id !== id));
      setFilteredCarts(filteredCarts.filter((cart) => cart._id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product: ' + error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...carts];

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((cart) => cart.price >= min && cart.price <= max);
    }

    // Add other filter logic as needed
    if (filters.typeOfPlants) {
      filtered = filtered.filter((cart) =>
        cart.PlantAbout?.toLowerCase().includes(filters.typeOfPlants.toLowerCase())
      );
    }
    if (filters.light) {
      filtered = filtered.filter((cart) =>
        cart.PlantAbout?.toLowerCase().includes(filters.light.toLowerCase())
      );
    }
    // Add similar logic for other filters (idealPlantsLocation, indoorOutdoor, etc.)

    setFilteredCarts(filtered);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      typeOfPlants: '',
      priceRange: '',
      light: '',
      idealPlantsLocation: '',
      indoorOutdoor: '',
      maintenance: '',
      potSize: '',
      waterSchedule: '',
      color: '',
      size: '',
    });
    setFilteredCarts(carts);
    setIsFilterOpen(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sorted = [...filteredCarts];

    switch (option) {
      case 'Alphabetically, A-Z':
        sorted.sort((a, b) => a.PlantName.localeCompare(b.PlantName));
        break;
      case 'Alphabetically, Z-A':
        sorted.sort((a, b) => b.PlantName.localeCompare(a.PlantName));
        break;
      case 'Price, low to high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Price, high to low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'Date, old to new':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'Date, new to old':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredCarts(sorted);
    setIsSortOpen(false);
  };

  if (loading) {
    return <div className="text-center mt-28">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-28">{error}</div>;
  }

  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-white shadow-md relative top-0">
        <button
          className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => setIsFilterOpen(true)}
        >
          <span className="mr-2">⟐</span> FILTER
        </button>
        <div className="flex items-center">
          <div className="relative">
            <button
              className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              SORT BY <span className="ml-2">▼</span>
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                {[
                  'Featured',
                  'Best selling',
                  'Alphabetically, A-Z',
                  'Alphabetically, Z-A',
                  'Price, low to high',
                  'Price, high to low',
                  'Date, old to new',
                  'Date, new to old',
                ].map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="ml-4">{filteredCarts.length} products</span>
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="absolute right-0 w-80 bg-white h-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter</h2>
              <button onClick={() => setIsFilterOpen(false)}>✕</button>
            </div>
            <p className="text-gray-600 mb-4">{filteredCarts.length} products</p>

            <div className="space-y-4">
              <div>
                <label className="block text-left py-2">Type of Plants</label>
                <input
                  type="text"
                  name="typeOfPlants"
                  value={filters.typeOfPlants}
                  onChange={handleFilterChange}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="e.g., Flowering"
                />
              </div>
              <div>
                <label className="block text-left py-2">Price</label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full mt-2 p-2 border rounded"
                >
                  <option value="">Select Price Range</option>
                  <option value="0-499">₹0 - ₹499</option>
                  <option value="500-999">₹500 - ₹999</option>
                  <option value="1000-1999">₹1000 - ₹1999</option>
                  <option value="2000-5000">₹2000 - ₹5000</option>
                </select>
              </div>
              <div>
                <label className="block text-left py-2">Light</label>
                <input
                  type="text"
                  name="light"
                  value={filters.light}
                  onChange={handleFilterChange}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="e.g., Full Sun"
                />
              </div>
              {/* Add similar inputs for other filters */}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded w-full mr-2"
                onClick={applyFilters}
              >
                APPLY
              </button>
              <button
                className="border border-gray-300 py-2 px-4 rounded w-full"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {filteredCarts.length === 0 ? (
          <div className="text-center col-span-full">
            {searchQuery ? `No plants found for "${searchQuery}"` : 'No products available'}
          </div>
        ) : (
          filteredCarts.map((cart) => (
            <div
              key={cart._id}
              className="h-[500px] w-[250px] lg:h-[500px] lg:w-[350px] bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <button className="h-6 w-6">
                  <Link to="/favorite">
                    <img src={Faverate} alt="Favorite" />
                  </Link>
                </button>
                <div className="flex gap-2">
                  <Link to="/addproduct" state={{ product: cart, isEdit: true }}>
                    <button
                      className={`h-6 w-6 text-blue-500 hover:text-blue-700 ${edit}`}
                      title="Edit Product"
                    >
                      ✏️
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(cart._id)}
                    className={`h-6 w-6 text-red-500 hover:text-red-700 ${delt}`}
                    title="Delete Product"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <Link to={`/details`} state={{ cart }}>
                <div className="flex items-center flex-col h-[250px] lg:h-[300px]">
                  <img
                    src={cart.imageUrl}
                    alt={cart.PlantName || 'Product'}
                    className="h-full w-full object-cover rounded mb-4"
                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  />
                </div>
                <h2 className="text-lg font-semibold mt-4 text-center">
                  {cart.PlantName || 'Unknown'}
                </h2>
                <div className="relative left-[10px] bottom-[5px]">
                  <h2 className="text-gray-600">Planting Day: {cart.PlantingDay || 'N/A'}</h2>
                  <h2 className="text-gray-600">Height: {cart.PlantingHeight || 'N/A'}</h2>
                  <h1>
                    <b className="text-green-600">₹ {cart.price || 0}</b>
                  </h1>
                  <Link to={`/details`} state={{ cart }}>
                    <button className="shop-item-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cards;