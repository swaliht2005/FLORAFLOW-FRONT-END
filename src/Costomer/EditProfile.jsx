

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import care from '../assets/images/care.jpg';

const EditProfile = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(care);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setFirstName(userData.firstName || '');
                setLastName(userData.lastName || '');
                setBio(userData.bio || '');
                setPhonenumber(userData.phonenumber || '');
                setEmail(userData.email || '');
                setAddress(userData.address || '');
                setGender(userData.gender || '');
                setImage(
                    userData.profileImage
                        ? `${API_URL}/api/uploads/${userData.profileImage}`
                        : care
                );
            } catch (err) {
                console.error('Error parsing user data from localStorage:', err);
                setImage(care);
            }
        } else {
            setImage(care);
        }
    }, [API_URL]);

    const imageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to update your profile');
            navigate('/login');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('bio', bio);
        formData.append('phonenumber', phonenumber);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('gender', gender);
        if (file) {
            formData.append('profileImage', file);
        }

        try {
            console.log('Sending request to:', `${API_URL}/api/profile`);
            console.log('FormData entries:', [...formData.entries()]);
            const response = await axios.put(`${API_URL}/api/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Profile save response:', response.data);
            setSuccess(response.data.message || 'Profile updated successfully');
            const updatedUser = response.data.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.dispatchEvent(new CustomEvent('userUpdated'));

            setTimeout(() => {
                navigate('/profile');
            }, 1000);
        } catch (err) {
            console.error('Error saving profile:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
            setError(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setError('');
        setSuccess('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden flex flex-col lg:flex-row">
                {/* Profile Image Section */}
                <div className="bg-gray-300 text-center py-10 px-6 flex flex-col items-center lg:w-1/2">
                    <h1 className="text-lg font-bold text-white mb-6">Set Your Profile</h1>
                    <div className="relative mt-8">
                        {image ? (
                            <img src={image} alt="Profile Thumbnail" className="w-full" />
                        ) : (
                            <img src={care} alt="Profile Icon" className="w-full" />
                        )}
                    </div>
                    {isEditing && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={imageChange}
                                className="hidden"
                                id="fileInput"
                            />
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer bg-gradient-to-r from-orange-400 to-red-400 px-4 py-2 rounded mt-6"
                            >
                                Upload Picture
                            </label>
                        </>
                    )}
                </div>

                {/* Profile Details Section */}
                <div className="p-8 lg:w-1/2">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-fade-in">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm animate-fade-in">
                            {success}
                        </div>
                    )}

                    {!isEditing ? (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h2>
                            <div className="space-y-3">
                                <p className="text-gray-600">
                                    <strong className="font-medium">First Name:</strong> {firstName || 'Not set'}
                                </p>
                                <p className="text-gray-600">
                                    <strong className="font-medium">Last Name:</strong> {lastName || 'Not set'}
                                </p>
                                <p className="text-gray-600">
                                    <strong className="font-medium">About:</strong> {bio || 'Not set'}
                                </p>
                                <p className="text-gray-600">
                                    <strong className="font-medium">Phone:</strong> {phonenumber || 'Not set'}
                                </p>
                                <p className="text-gray-600">
                                    <strong className="font-medium">Email:</strong> {email || 'Not set'}
                                </p>
                                <p className="text-gray-600">
                                    <strong className="font-medium">Address:</strong> {address || 'Not set'}
                                </p>
                                <p className="text-gray-600">
                                    <strong className="font-medium">Gender:</strong> {gender || 'Not set'}
                                </p>
                            </div>
                            <button
                                onClick={toggleEditMode}
                                className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                    About You
                                </label>
                                <textarea
                                    id="bio"
                                    placeholder="Tell us about yourself"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    id="phonenumber"
                                    type="tel"
                                    placeholder="Your phone number"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        Female
                                    </label>
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        Male
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={toggleEditMode}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition text-sm font-medium"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center justify-center ${
                                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            />
                                        </svg>
                                    ) : null}
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;