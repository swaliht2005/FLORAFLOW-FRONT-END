
import React, { useState, useRef, useEffect } from 'react';
import ProfileIcon from '../assets/images/profileicon.png';
import { useFetcher } from 'react-router-dom';

// Helper component for the icons
const BellIcon = ({ type, className = '' }) => {
  let pathD = '';
  switch (type) {
    case 'all':
      pathD = "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a6 6 0 004 0M9 17a6 6 0 01-6 0m12 0v2m0 0a2 2 0 01-2 2H8a2 2 0 01-2-2v-2m-3 0h12M15.5 2.5l-2.5 2.5M8.5 2.5l2.5 2.5";
      break;
    case 'personalised':
      pathD = "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a6 6 0 004 0M9 17a6 6 0 01-6 0m12 0v2m0 0a2 2 0 01-2 2H8a2 2 0 01-2-2v-2m-3 0h12";
      break;
    case 'none':
      pathD = "M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a6 6 0 004 0M9 17a6 6 0 01-6 0m12 0v2m0 0a2 2 0 01-2 2H8a2 2 0 01-2-2v-2m-3 0h12M19.799 4.2L4.2 19.799";
      break;
    default:
      pathD = "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a6 6 0 004 0M9 17a6 6 0 01-6 0m12 0v2m0 0a2 2 0 01-2 2H8a2 2 0 01-2-2v-2m-3 0h12";
  }

  return (
    <svg
      className={`w-5 h-5 ${className}`}
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={pathD}></path>
    </svg>
  );
};

const UnsubscribeIcon = ({ className = '' }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    ></path>
  </svg>
);

const SubscribeButton = ({ user, hideSubscribe = false, id }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationType, setNotificationType] = useState('none');
  const [profilePhoto, setProfilePhoto] = useState(ProfileIcon);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const loadProfilePhoto = async () => {
    try {
      const filename = user?.profileImage;

      if (filename) {
        const imageUrl = `http://localhost:5000/api/uploads/${filename}`;
        console.log('Attempting to load profile image URL:', imageUrl);

        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (response.ok) {
          setProfilePhoto(imageUrl);
          console.log('Profile image URL is valid:', imageUrl);
        } else {
          console.warn('Profile image URL is invalid, status:', response.status, response.statusText);
          setProfilePhoto(ProfileIcon);
        }
      } else {
        console.log('No profile image found, using default');
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

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user]);

  const handleSubscribeClick = () => {
    if (!isSubscribed) {
      setIsSubscribed(true);
      setNotificationType('all');
    } else {
      setShowDropdown((prev) => !prev);
    }
  };

  const handleNotificationChange = (type) => {
    setNotificationType(type);
    setShowDropdown(false);
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    setNotificationType('none');
    setShowDropdown(false);
  };

  const getBellIconForButton = () => {
    if (!isSubscribed) return null;
    return <BellIcon type={notificationType} className="w-5 h-5 text-white" />;
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <img
          src={isLoadingPhoto ? ProfileIcon : profilePhoto}
          alt="Profile Icon"
          className="h-6 w-6 md:h-6 md:w-6 lg:h-8 lg:w-8 object-cover rounded-full"
          onError={(e) => {
            console.error('Failed to load profile image:', profilePhoto, 'Error:', e);
            setProfilePhoto(ProfileIcon);
          }}
        />
        <p className="text-sm text-gray-800">
          {user?.firstName || 'N/A'} {user?.lastName || 'N/A'}
        </p>
      </div>
      {!hideSubscribe && (
        <>
          {!isSubscribed ? (
            <button
              id={id}
              ref={buttonRef}
              onClick={handleSubscribeClick}
              className="
                px-4 py-2
                rounded-full
                font-medium
                text-sm
                bg-black hover:bg-black
                text-white
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
                transform hover:scale-105
              "
            >
              Subscribe
            </button>
          ) : (
            <button
              id={id}
              ref={buttonRef}
              onClick={handleSubscribeClick}
              className="
                px-4 py-2
                rounded-full
                font-medium
                text-sm
                bg-gradient-to-r from-pink-500 to-yellow-500 text-white
                flex items-center justify-center gap-1
                border border-gray-300
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
                transform hover:scale-105
              "
            >
              {getBellIconForButton()}
              <span>Subscribed</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-300 ease-in-out ${showDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          )}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="
                absolute top-full left-0 mt-2
                w-full sm:w-60
                bg-gray-800
                rounded-lg
                shadow-lg
                py-2
                z-20
                animate-dropdown
              "
            >
              <div
                className={`
                  flex items-center gap-3 px-4 py-2
                  text-white text-sm
                  cursor-pointer
                  hover:bg-gray-700
                  transition-colors duration-200
                  ${notificationType === 'all' ? 'bg-gray-700' : ''}
                `}
                onClick={() => handleNotificationChange('all')}
              >
                <BellIcon type="all" className="text-white" />
                All
              </div>
              <div
                className={`
                  flex items-center gap-3 px-4 py-2
                  text-white text-sm
                  cursor-pointer
                  hover:bg-gray-700
                  transition-colors duration-200
                  ${notificationType === 'personalised' ? 'bg-gray-700' : ''}
                `}
                onClick={() => handleNotificationChange('personalised')}
              >
                <BellIcon type="personalised" className="text-white" />
                Personalised
              </div>
              <div
                className={`
                  flex items-center gap-3 px-4 py-2
                  text-white text-sm
                  cursor-pointer
                  hover:bg-gray-700
                  transition-colors duration-200
                  ${notificationType === 'none' ? 'bg-gray-700' : ''}
                `}
                onClick={() => handleNotificationChange('none')}
              >
                <BellIcon type="none" className="text-white" />
                None
              </div>
              <div
                className="
                  flex items-center gap-3 px-4 py-2
                  text-white text-sm
                  cursor-pointer
                  hover:bg-gray-700
                  transition-colors duration-200
                  mt-2 border-t border-gray-700 pt-2
                "
                onClick={handleUnsubscribe}
              >
                <UnsubscribeIcon className="text-white" />
                Unsubscribe
              </div>
            </div>
          )}
        </>
      )}
      <style jsx>{`
        @keyframes dropdown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SubscribeButton;
