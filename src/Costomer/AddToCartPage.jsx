import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navebar from '../Combonents/Navebar';
import Footer2 from '../Combonents/Footer2';

function AddToCartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Please log in to view your cart');
                }

                const response = await fetch('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error(`Failed to load cart (Status: ${response.status})`);
                }

                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setError(error.message);
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        if (!window.confirm('Are you sure you want to remove this item from your cart?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to remove from cart (Status: ${response.status})`);
            }

            setCartItems(cartItems.filter((item) => item._id !== productId));
            alert('Product removed from cart successfully!');
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Failed to remove product: ' + error.message);
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to update quantity (Status: ${response.status})`);
            }

            setCartItems(
                cartItems.map((item) =>
                    item._id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navebar />
                <div className="container mx-auto p-6 pt-28">
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
                <Navebar />
                <div className="container mx-auto p-6 pt-28 text-center">
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
            <Navebar className="fixed z-20" />
            <div className="container mx-auto p-6 pt-28 pb-40">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-600 py-10">
                        Your cart is empty.{' '}
                        <Link to="/shopemore" className="text-green-600 hover:underline">
                            Shop now!
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.cartId}
                                className="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4"
                            >
                                <Link to={`/details`} state={{ cart: item }}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.PlantName || 'Plant product'}
                                        className="w-full sm:w-32 h-32 object-cover rounded"
                                        onError={(e) => (e.target.src = '/fallback-image.jpg')}
                                    />
                                </Link>
                                <div className="flex-1">
                                    <Link to={`/details`} state={{ cart: item }}>
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {item.PlantName || 'Unknown'}
                                        </h2>
                                    </Link>
                                    <p className="text-sm text-gray-600">Planted: {item.PlantingDay || 'N/A'}</p>
                                    <p className="text-sm text-gray-600">Height: {item.PlantingHeight || 'N/A'}</p>
                                    <p className="text-lg font-bold text-green-600 mt-2">₹{item.price || 0}</p>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 disabled:bg-gray-400"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Remove from cart"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"
                                            />
                                        </svg>
                                    </button>
                                    <Link to="/details" state={{ cart: item }}>
                                        <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                                            Proceed to Checkout
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer2 id='z-30' />
        </div>
    );
}

export default AddToCartPage;
