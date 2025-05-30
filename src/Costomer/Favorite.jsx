import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navebar from '../Combonents/Navebar';
import Footer2 from '../Combonents/Footer2';

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Please log in to view your favorites');
                }

                const response = await fetch('http://localhost:5000/api/favorite', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to load favorites (Status: ${response.status})`);
                }
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setError(error.message);
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (productId) => {
        if (!window.confirm('Are you sure you want to remove this item from your favorites?')) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please log in to remove favorites');
            }

            const response = await fetch(`http://localhost:5000/api/favorite/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to remove favorite (Status: ${response.status})`);
            }

            // Update the favorites state to remove the item
            setFavorites(favorites.filter((item) => item._id !== productId));
            alert('Product removed from favorites successfully!');
        } catch (error) {
            console.error('Error removing favorite:', error);
            alert('Failed to remove favorite: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navebar id="fixed z-20" />
                <div className="container mx-auto p-6 relative top-28 pb-40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
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
                <Footer2 />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navebar id="fixed z-20" />
                <div className="container mx-auto p-6 relative top-28 pb-40 text-center">
                    <p className="text-red-600 text-lg font-semibold">{error}</p>
                    <button
                        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
                <Footer2 />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navebar id="fixed z-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative top-28 pb-40 container mx-auto p-6">
                {favorites.length === 0 ? (
                    <div className="col-span-full text-center text-gray-600 py-10">
                        No favorite plants found
                    </div>
                ) : (
                    favorites.map((cart) => (
                        <div
                            key={cart._id}
                            className="h-[400px] w-[250px] lg:h-[460px] lg:w-[350px] bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between mx-auto"
                        >
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleRemoveFavorite(cart._id)}
                                    className="h-6 w-6"
                                    aria-label="Remove from favorites"
                                >
                                    <svg
                                        className="w-6 h-6 text-red-500 hover:text-red-700"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <Link to={`/details`} state={{ cart }}>
                                <div className="flex items-center flex-col h-[250px] lg:h-[300px]">
                                    <img
                                        src={cart.imageUrl}
                                        alt={cart.PlantName}
                                        className="h-full w-full object-cover rounded mb-4"
                                        onError={(e) => (e.target.src = '/fallback-image.jpg')}
                                    />
                                </div>
                                <h2 className="text-lg font-semibold mt-4 text-center">{cart.PlantName}</h2>
                                <div className="relative left-[10px] bottom-[5px]">
                                    <h2 className="text-gray-600">Planting Day: {cart.PlantingDay}</h2>
                                    <h2 className="text-gray-600">Height: {cart.PlantingHeight}</h2>
                                    <h1>
                                        <b className="text-green-600">₹{cart.price}</b>
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
            <Footer2 />
        </div>
    );
}

export default Favorite;