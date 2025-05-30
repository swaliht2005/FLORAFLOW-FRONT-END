// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useSearch } from '../context/SearchContext';
// import Faverate from '../assets/images/favorites.png';
// import SubscribeButton from '../Combonents/SubscribeButton';

// function Cards({ edit = 'hidden', delt = 'hidden', carts = null }) {
//     const [internalCarts, setInternalCarts] = useState([]);
//     const [filteredCarts, setFilteredCarts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { searchQuery } = useSearch();
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [isSortOpen, setIsSortOpen] = useState(false);
//     const [sortOption, setSortOption] = useState('Featured');
//     const [filters, setFilters] = useState({
//         priceRange: '',
//     });

//     useEffect(() => {
//         if (carts) {
//             setInternalCarts(carts);
//             setFilteredCarts(carts);
//             setLoading(false);
//         } else {
//             const fetchProducts = async () => {
//                 setLoading(true);
//                 try {
//                     const url = `http://localhost:5000/api/seller${
//                         searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''
//                     }`;
//                     const response = await fetch(url);
//                     if (!response.ok) {
//                         throw new Error(`Failed to load products (Status: ${response.status})`);
//                     }
//                     const data = await response.json();
//                     const products = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
//                     setInternalCarts(products);
//                     setFilteredCarts(products);
//                 } catch (error) {
//                     console.error('Error fetching products:', error);
//                     setError('Unable to load products. Please try again later.');
//                     setInternalCarts([]);
//                     setFilteredCarts([]);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchProducts();
//         }
//     }, [searchQuery, carts]);

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this product?')) return;

//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:5000/api/seller/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || `Failed to delete (Status: ${response.status})`);
//             }
//             setInternalCarts(internalCarts.filter((cart) => cart._id !== id));
//             setFilteredCarts(filteredCarts.filter((cart) => cart._id !== id));
//             alert('Product deleted successfully!');
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             alert('Failed to delete product: ' + error.message);
//         }
//     };

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({ ...prev, [name]: value }));
//     };

//     const applyFilters = () => {
//         let filtered = [...internalCarts];
//         if (filters.priceRange) {
//             const [min, max] = filters.priceRange.split('-').map(Number);
//             filtered = filtered.filter((cart) => cart.price >= min && cart.price <= max);
//         }
//         setFilteredCarts(filtered);
//         setIsFilterOpen(false);
//     };

//     const clearFilters = () => {
//         setFilters({ priceRange: '' });
//         setFilteredCarts(internalCarts);
//         setIsFilterOpen(false);
//     };

//     const handleSortChange = (option) => {
//         setSortOption(option);
//         let sorted = [...filteredCarts];
//         switch (option) {
//             case 'Alphabetically, A-Z':
//                 sorted.sort((a, b) => a.PlantName.localeCompare(b.PlantName));
//                 break;
//             case 'Alphabetically, Z-A':
//                 sorted.sort((a, b) => b.PlantName.localeCompare(b.PlantName));
//                 break;
//             case 'Price, low to high':
//                 sorted.sort((a, b) => a.price - b.price);
//                 break;
//             case 'Price, high to low':
//                 sorted.sort((a, b) => b.price - a.price);
//                 break;
//             case 'Date, old to new':
//                 sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//                 break;
//             case 'Date, new to old':
//                 sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                 break;
//             default:
//                 break;
//         }
//         setFilteredCarts(sorted);
//         setIsSortOpen(false);
//     };

//     if (loading) {
//         return (
//             <div className="container mx-auto p-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {[...Array(8)].map((_, i) => (
//                         <div key={i} className="bg-white rounded-lg shadow animate-pulse">
//                             <div className="h-64 bg-gray-200 rounded-t-lg"></div>
//                             <div className="p-4 space-y-4">
//                                 <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//                                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                                 <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto p-6 text-center">
//                 <p className="text-red-600 text-lg font-semibold">{error}</p>
//                 <button
//                     className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//                     onClick={() => window.location.reload()}
//                 >
//                     Retry
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//             {/* Header: Filter and Sort */}
//             <div className="flex flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
//                 <button
//                     className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mb-2 sm:mb-0"
//                     onClick={() => setIsFilterOpen(true)}
//                     aria-label="Open filter panel"
//                 >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-4 8H3m13 8H3" />
//                     </svg>
//                     Filter
//                 </button>
//                 <div className="flex items-center space-x-4">
//                     <div className="relative">
//                         <button
//                             className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//                             onClick={() => setIsSortOpen(!isSortOpen)}
//                             aria-label="Toggle sort options"
//                         >
//                             Sort by: {sortOption} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                         {isSortOpen && (
//                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border">
//                                 {[
//                                     'Featured',
//                                     'Alphabetically, A-Z',
//                                     'Alphabetically, Z-A',
//                                     'Price, low to high',
//                                     'Price, high to low',
//                                     'Date, old to new',
//                                     'Date, new to old',
//                                 ].map((option) => (
//                                     <button
//                                         key={option}
//                                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                                         onClick={() => handleSortChange(option)}
//                                     >
//                                         {option}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     {/* <span className="text-gray-600">{filteredCarts.length} products</span> */}
//                 </div>
//             </div>

//             {/* Filter Panel */}
//             {isFilterOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
//                     <div className="w-full max-w-sm bg-white p-6 h-full overflow-y-auto">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
//                             <button
//                                 className="text-gray-600 hover:text-gray-800"
//                                 onClick={() => setIsFilterOpen(false)}
//                                 aria-label="Close filter panel"
//                             >
//                                 ✕
//                             </button>
//                         </div>
//                         <div className="space-y-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
//                                 <select
//                                     name="priceRange"
//                                     value={filters.priceRange}
//                                     onChange={handleFilterChange}
//                                     className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                                 >
//                                     <option value="">All Prices</option>
//                                     <option value="0-499">₹0 - ₹499</option>
//                                     <option value="500-999">₹500 - ₹999</option>
//                                     <option value="1000-1999">₹1000 - ₹1999</option>
//                                     <option value="2000-5000">₹2000 - ₹5000</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="flex space-x-4 mt-8">
//                             <button
//                                 className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
//                                 onClick={applyFilters}
//                             >
//                                 Apply Filters
//                             </button>
//                             <button
//                                 className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
//                                 onClick={clearFilters}
//                             >
//                                 Clear
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Product Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredCarts.length === 0 ? (
//                     <div className="col-span-full text-center text-gray-600 py-10">
//                         {searchQuery ? `No plants found for "${searchQuery}"` : 'No products available'}
//                     </div>
//                 ) : (
//                     filteredCarts.map((cart) => (
//                         <div
//                             key={cart._id}
//                             className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
//                         >
//                             <div className="relative">
//                                 <Link to={`/details`} state={{ cart }} aria-label={`View details of ${cart.PlantName}`}>
//                                     <img
//                                         src={cart.imageUrl}
//                                         alt={cart.PlantName || 'Plant product'}
//                                         className="w-full h-48 object-cover"
//                                         onError={(e) => (e.target.src = '/fallback-image.jpg')}
//                                     />
//                                 </Link>
//                                 <div className="absolute top-2 right-2 flex space-x-2">
//                                     <Link to="/favorite" aria-label="Add to favorites">
//                                         <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
//                                             <img src={Faverate} alt="Favorite" className="w-5 h-5" />
//                                         </button>
//                                     </Link>
//                                     <Link to="/addproduct" state={{ product: cart, isEdit: true }}>
//                                         <button
//                                             className={`p-1 bg-white rounded-full shadow hover:bg-gray-100 ${edit}`}
//                                             aria-label="Edit product"
//                                         >
//                                             <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                                             </svg>
//                                         </button>
//                                     </Link>
//                                     <button
//                                         onClick={() => handleDelete(cart._id)}
//                                         className={`p-1 bg-white rounded-full shadow hover:bg-gray-100 ${delt}`}
//                                         aria-label="Delete product"
//                                     >
//                                         <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="p-4">
//                                 <Link to={`/details`} state={{ cart }}>
//                                     <h2 className="text-lg font-semibold text-gray-800 truncate">{cart.PlantName || 'Unknown'}</h2>
//                                 </Link>
//                                 <p className="text-sm text-gray-600">Planted: {cart.PlantingDay || 'N/A'}</p>
//                                 <p className="text-sm text-gray-600">Height: {cart.PlantingHeight || 'N/A'}</p>
//                                 <p className="text-lg font-bold text-green-600 mt-2">₹{cart.price || 0}</p>
//                                 <Link to={`/details`} state={{ cart }}>
//                                     <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
//                                         Add to Cart
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Cards;


// Cards.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import Faverate from '../assets/images/favorites.png';
import SubscribeButton from '../Combonents/SubscribeButton';

function Cards({ edit = 'hidden', delt = 'hidden', carts = null      }) {
    const [internalCarts, setInternalCarts] = useState([]);
    const [filteredCarts, setFilteredCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { searchQuery } = useSearch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState('Featured');
    const [filters, setFilters] = useState({ priceRange: '' });
    const [favorites, setFavorites] = useState([]); // Track favorite products

    // Fetch products and favorites
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch products
                const url = `http://localhost:5000/api/seller${
                    searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''
                }`;
                const productResponse = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!productResponse.ok) {
                    throw new Error(`Failed to load products (Status: ${productResponse.status})`);
                }
                const productData = await productResponse.json();
                const products = Array.isArray(productData) ? productData : Array.isArray(productData.data) ? productData.data : [];
                setInternalCarts(products);
                setFilteredCarts(products);

                // Fetch favorites
                const favoriteResponse = await fetch('http://localhost:5000/api/favorite', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!favoriteResponse.ok) {
                    throw new Error(`Failed to load favorites (Status: ${favoriteResponse.status})`);
                }
                const favoriteData = await favoriteResponse.json();
                setFavorites(favoriteData.map(fav => fav._id));
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Unable to load products or favorites. Please try again later.');
                setInternalCarts([]);
                setFilteredCarts([]);
            } finally {
                setLoading(false);
            }
        };

        if (!carts) {
            fetchData();
        } else {
            setInternalCarts(carts);
            setFilteredCarts(carts);
            setLoading(false);
        }
    }, [searchQuery, carts]);

    // Handle adding/removing favorite
    const handleFavorite = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const isFavorited = favorites.includes(productId);

            const url = `http://localhost:5000/api/favorite/${productId}`;
            const method = isFavorited ? 'DELETE' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${isFavorited ? 'remove' : 'add'} favorite (Status: ${response.status})`);
            }

            if (isFavorited) {
                setFavorites(favorites.filter(id => id !== productId));
                alert('Product removed from favorites!');
            } else {
                setFavorites([...favorites, productId]);
                alert('Product added to favorites!');
            }
        } catch (error) {
            console.error('Error handling favorite:', error);
            alert(`Failed to ${favorites.includes(productId) ? 'remove' : 'add'} favorite: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/seller/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to delete (Status: ${response.status})`);
            }
            setInternalCarts(internalCarts.filter((cart) => cart._id !== id));
            setFilteredCarts(filteredCarts.filter((cart) => cart._id !== id));
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product: ' + error.message);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        let filtered = [...internalCarts];
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter((cart) => cart.price >= min && cart.price <= max);
        }
        setFilteredCarts(filtered);
        setIsFilterOpen(false);
    };

    const clearFilters = () => {
        setFilters({ priceRange: '' });
        setFilteredCarts(internalCarts);
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
                sorted.sort((a, b) => b.PlantName.localeCompare(b.PlantName));
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
        return (
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                            <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                            <div className="p-4 space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-red-600 text-lg font-semibold">{error}</p>
                <button
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header: Filter and Sort */}
            <div className="flex flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
                <button
                    className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mb-2 sm:mb-0"
                    onClick={() => setIsFilterOpen(true)}
                    aria-label="Open filter panel"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-4 8H3m13 8H3" />
                    </svg>
                    Filter
                </button>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            aria-label="Toggle sort options"
                        >
                            Sort by: {sortOption} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isSortOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border">
                                {[
                                    'Featured',
                                    'Alphabetically, A-Z',
                                    'Alphabetically, Z-A',
                                    'Price, low to high',
                                    'Price, high to low',
                                    'Date, old to new',
                                    'Date, new to old',
                                ].map((option) => (
                                    <button
                                        key={option}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => handleSortChange(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
                    <div className="w-full max-w-sm bg-white p-6 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => setIsFilterOpen(false)}
                                aria-label="Close filter panel"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                <select
                                    name="priceRange"
                                    value={filters.priceRange}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">All Prices</option>
                                    <option value="0-499">₹0 - ₹499</option>
                                    <option value="500-999">₹500 - ₹999</option>
                                    <option value="1000-1999">₹1000 - ₹1999</option>
                                    <option value="2000-5000">₹2000 - ₹5000</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            <button
                                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>
                            <button
                                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                                onClick={clearFilters}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCarts.length === 0 ? (
                    <div className="col-span-full text-center text-gray-600 py-10">
                        {searchQuery ? `No plants found for "${searchQuery}"` : 'No products available'}
                    </div>
                ) : (
                    filteredCarts.map((cart) => (
                        <div
                            key={cart._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            <div className="relative">
                                <Link to={`/details`} state={{ cart }} aria-label={`View details of ${cart.PlantName}`}>
                                    <img
                                        src={cart.imageUrl}
                                        alt={cart.PlantName || 'Plant product'}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => (e.target.src = '/fallback-image.jpg')}
                                    />
                                </Link>
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button
                                        onClick={() => handleFavorite(cart._id)}
                                        className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                                        aria-label={favorites.includes(cart._id) ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <img
                                            src={Faverate}
                                            alt="Favorite"
                                            className={`w-5 h-5 ${favorites.includes(cart._id) ? 'filter brightness-75' : ''}`}
                                        />
                                    </button>
                                    <Link to="/addproduct" state={{ product: cart, isEdit: true }}>
                                        <button
                                            className={`p-1 bg-white rounded-full shadow hover:bg-gray-100 ${edit}`}
                                            aria-label="Edit product"
                                        >
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(cart._id)}
                                        className={`p-1 bg-white rounded-full shadow hover:bg-gray-100 ${delt}`}
                                        aria-label="Delete product"
                                    >
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <Link to={`/details`} state={{ cart }}>
                                    <h2 className="text-lg font-semibold text-gray-800 truncate">{cart.PlantName || 'Unknown'}</h2>
                                </Link>
                                <p className="text-sm text-gray-600">Planted: {cart.PlantingDay || 'N/A'}</p>
                                <p className="text-sm text-gray-600">Height: {cart.PlantingHeight || 'N/A'}</p>
                                <p className="text-lg font-bold text-green-600 mt-2">₹{cart.price || 0}</p>
                                <Link to={`/details`} state={{ cart }}>
                                    <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                                        Add to Cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Cards;

