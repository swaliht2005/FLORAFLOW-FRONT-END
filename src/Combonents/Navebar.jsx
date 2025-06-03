

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import FloraflowLogo from '../assets/images/FloraflowLogo.png';
import ProfileIcon from '../assets/images/profileicon.png';
import SearchIcon from '../assets/images/Navebarinput.png';
import NotificationIcon from '../assets/images/notification.png';
import Useredeuser from './Useredeuser';

function    Navebar({ id = '' }) {
  const [state, setState] = useState({ isMobileMenuOpen: false });
  const [input, setInput] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(ProfileIcon);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);
  const { setSearchQuery } = useSearch();

  // Load profile photo from localStorage or custom event
  const loadProfilePhoto = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const filename = user.profileImage;

      if (filename) {
        const imageUrl = `http://localhost:5000/api/uploads/${filename}`; // Corrected path
        console.log('Attempting to load profile image URL:', imageUrl);

        // Test image URL
        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (response.ok) {
          setProfilePhoto(imageUrl);
          console.log('Profile image URL is valid:', imageUrl);
        } else {
          console.warn('Profile image URL is invalid, status:', response.status, response.statusText);
          setProfilePhoto(ProfileIcon);
        }
      } else {
        console.log('No profile image found in localStorage, using default');
        setProfilePhoto(ProfileIcon);
      }
    } catch (error) {
      console.error('Error loading profile photo:', error.message);
      setProfilePhoto(ProfileIcon);
    } finally {
      setIsLoadingPhoto(false);
    }
  };

  useEffect(() => {
    loadProfilePhoto();

    // Listen for storage changes (cross-tab updates)
    window.addEventListener('storage', loadProfilePhoto);
    // Listen for userUpdated event (same-tab updates from EditProfile)
    window.addEventListener('userUpdated', loadProfilePhoto);

    return () => {
      window.removeEventListener('storage', loadProfilePhoto);
      window.removeEventListener('userUpdated', loadProfilePhoto);
    };
  }, []);

  const toggleMobileMenu = () => {
    setState(( valuesss) => ({
      ...valuesss,
      isMobileMenuOpen: !valuesss.isMobileMenuOpen,
    }));
  };

  const openInput = () => setInput(true);
  const closeInput = () => {
    setInput(false);
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`h-auto w-full bg-green-900 shadow-xl ${id}`}>
      <Useredeuser />
      <div className="py-4 md:h-[100px] flex items-center justify-between px-4 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={FloraflowLogo}
            alt="Flora Flow Logo"
            className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px] lg:h-[60px] lg:w-[55px]"
          />
          <h3 className="font-handwriting text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Flora Flow
          </h3>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-x-4 lg:gap-x-6">
          <Link to="/homePage" className="text-sm lg:text-lg font-medium text-white hover:underline">
            Home
          </Link>
          <Link to="/addproduct" className="text-sm lg:text-lg font-medium text-white hover:underline">
            Add Plants
          </Link>
          <Link to="/about" className="text-sm lg:text-lg font-medium text-white hover:underline">
            About
          </Link>
          <Link to="/favorite" className="text-sm lg:text-lg font-medium text-white hover:underline">
            Favorite
          </Link>
           <Link to="/chatapp" className="text-sm lg:text-lg font-medium text-white hover:underline">
           Chat
          </Link>
           <Link to="/addtocart" className="text-sm lg:text-lg font-medium text-white hover:underline">
           Cart
          </Link>
        </div>

        {/* Profile and Actions */}
        <div className="flex items-center gap-3 sm:gap-2 relative ml-11">
          {/* Search Icon */}
          {!input && (
            <button
              className="flex items-center justify-center bg-gradient-to-l rounded-full text-white shadow-lg hover:shadow-md h-5 w-5 p-1 lg:w-10 active:scale-95"
              onClick={openInput}
            >
              <img src={SearchIcon} alt="Search" className="lg:h-7 lg:w-7" />
            </button>
          )}

          {/* Search Modal (Desktop) */}
          {input && (
            <div className="hidden md:flex items-center bg-white shadow-lg rounded-full w-[300px] lg:w-[450px] h-[50px] pr-4">
              <img
                src={SearchIcon}
                alt="Search Icon"
                className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 object-cover rounded-full ml-2"
              />
              <input
                type="text"
                placeholder="Search plants..."
                className="flex-grow outline-none text-gray-700 text-sm sm:text-base rounded-full px-2"
                onChange={handleSearch}
              />
              <button onClick={closeInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20px"
                  height="20px"
                  className="text-gray-500 hover:text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Notification */}
          <Link to="/notification">
            <img
              src={NotificationIcon}
              alt="Notification"
              className="h-5 w-5 md:h-5 md:w-5 lg:h-7 lg:w-7 object-cover rounded-full"
            />
          </Link>

          {/* Profile */}
          <Link to="/profile">
            <img
              src={isLoadingPhoto ? ProfileIcon : profilePhoto}
              alt="Profile Icon"
              className="h-6 w-6 md:h-6 md:w-6 lg:h-8 lg:w-8 object-cover rounded-full"
              onError={(e) => {
                console.error('Failed to load profile image:', profilePhoto, 'Error:', e);
                setProfilePhoto(ProfileIcon);
              }}
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="text-white lg:hidden focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {state.isMobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-green-800">
          <Link to="/homePage" className="text-white px-4 py-2">
            Home
          </Link>
          <Link to="/addproduct" className="text-white px-4 py-2">
            Add Plants
          </Link>
          <Link to="/about" className="text-white px-4 py-2">
            About
          </Link>
          <Link to="/favorite" className="text-white px-4 py-2">
            Favorite
          </Link>
          <Link to="/profile" className="text-white px-4 py-2">
            Profile
          </Link>
          <Link to="/chatapp" className="text-white px-4 py-2">
           Chat
          </Link>
           <Link to="/addtocart" className="text-white px-4 py-2">
           Cart
          </Link>
        </div>
      )}

      {/* Mobile Search Input */}
      {input && (
        <div className="flex items-center bg-white shadow-lg rounded-full w-full sm:w-[450px] h-[40px] md:hidden mx-4 mb-4">
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="h-6 w-6 sm:h-8 sm:w-8 object-cover rounded-full ml-2"
          />
          <input
            type="text"
            placeholder="Search plants..."
            className="flex-grow outline-none text-gray-700 text-sm sm:text-base pl-4"
            onChange={handleSearch}
          />
          <button onClick={closeInput} className="text-gray-500 hover:text-red-500 pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navebar;