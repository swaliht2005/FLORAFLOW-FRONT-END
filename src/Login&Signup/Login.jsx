import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loginsignupimg from '../assets/images/Loginsignupimg.png';

const Login = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/user/login`, {
                email: email.trim(), // Trim whitespace from email
                password,
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Login successful, redirecting to /profile', { userId: user._id, email });
            navigate('/profile');
        } catch (err) {
            console.error('Login error:', { message: err.message, response: err.response?.data });
            setError(err.response?.data?.error || err.response?.data?.message || 'Failed to log in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <img
                src={Loginsignupimg}
                alt="Start Page"
                className="h-full w-full object-cover object-center absolute top-0 left-0 z-0"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
            {/* Login Form */}
            <div className="relative z-20 bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-white/30 rounded-md p-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-white/30 rounded-md p-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-md text-white transition-colors duration-300 ${
                            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 bg-opacity-90 hover:bg-opacity-100'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;