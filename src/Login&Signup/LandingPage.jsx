import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Startimg from '../assets/images/Startimg.png';

function LandingPage() {
  const [opacityClass, setOpacityClass] = useState('opacity-50');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacityClass('opacity-100');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Background Image */}
      <img
        src={Startimg}
        alt="Start Page"
        className="h-full w-full object-cover absolute top-0 left-0"
      />

      {/* Overlay Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-full px-4 sm:px-8">
        <p
          className={`text-center text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 transition-opacity duration-1000 font-serif ${opacityClass}`}
        >
          WELCOME <br /> PLANTS WORLD
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link to="/signUp">
            <button className="w-full max-w-xs bg-green-600 text-white text-lg sm:text-xl font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300">
              SIGN UP
            </button>
          </Link>
          <Link to="/login">
            <button className="w-full max-w-xs bg-green-600 text-white text-lg sm:text-xl font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition duration-300">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
