

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FloraflowLogo from '../assets/images/FloraflowLogo.png';
import Profileicon from '../assets/images/profileicon.png';
import Navebarinput from '../assets/images/Navebarinput.png';
import Useredeuser from './Useredeuser';
import serch from '../assets/images/Navebarinput.png';
import notification from '../assets/images/notification.png';

function Navebar({ id = '' }) {
  const [state, setState] = useState({ isMobileMenuOpen: false });
  const [input, setInput] = useState(false);

  const toggleMobileMenu = () => {
    setState((prevState) => ({
      ...prevState,
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  const openInput = () => setInput(true);
  const closeInput = () => setInput(false);

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
          <Link
            to="/homePage"
            className="text-sm lg:text-lg font-medium text-white hover:underline"
          >
            Home
          </Link>
          <Link
            to="/addproduct"
            className="text-sm lg:text-lg font-medium text-white hover:underline"
          >
            Add Plants
          </Link>
          <Link
            to="/about"
            className="text-sm lg:text-lg font-medium text-white hover:underline"
          >
            About
          </Link>
          <Link
            to="/favorite"
            className="text-sm lg:text-lg font-medium text-white hover:underline"
          >
            Favorite
          </Link>
        </div>

        {/* Profile and Actions */}
        <div className="flex items-center gap-3 sm:gap-2 relative ml-11 ">
  {/* Search Icon */}
  {!input && (
    <button
      className="flex items-center justify-center bg-gradient-to-l rounded-full text-white shadow-lg hover:shadow-md h-5 w-5 p-1 lg:w-10  active:scale-95"
      onClick={openInput}
    >
      <img src={serch} alt="Search" className='lg:h-7 lg:w-18' />
    </button>
  )}

  {/* Search Modal */}
  {input && (
  <div
  className={`flex ${
    state.isMobileMenuOpen ? 'w-full' : 'w-[300px]'
  } lg:w-[450px] ${
    state.isMobileMenuOpen ? 'h-full' : 'h-[50px]'
  } bg-white  shadow-lg rounded-full hidden h-[50px] w-[300px] md:hidden  lg:flex items-center  pr-4`}
>
 
    <img
      src={Navebarinput}
      alt="Search Icon"
      className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 object-cover  rounded-full"
    />
    <input
      type="text"
      placeholder="Search..."
      className="flex-grow outline-none text-gray-700 text-sm sm:text-base hidden md:block rounded-full px-2 "
    />
    <button onClick={closeInput}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20px"
        height="20px"
        className="close-icon text-gray-500 hidden md:block hover:text-red-500"
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
      src={notification}
      alt="Notification"
      className="h-5 w-5   md:h-5 md:w-5 lg:h-7 lg:w-7 object-cover rounded-full"

    />
  </Link>

  {/* Profile */}
  <Link to="/profile">
  <img
    src={Profileicon}
    alt="Profile Icon"
    className="h-6 w-6    md:h-6 md:w-6 lg:h-8 lg:w-8 object-cover rounded-full"
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
        </div>
      )}
  {input && (
  <div
    className={`flex items-center bg-white shadow-lg rounded-full 
      ${state.isMobileMenuOpen ? 'w-full h-full' : 'w-[300px] h-[40px]'}
      sm:w-[450px] lg:hidden`}
  >
    {/* Search Icon */}
    <img
      src={Navebarinput}
      alt="Search Icon"
      className="hidden sm:block h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-full object-cover ml-2"
    />

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search..."
      className="flex-grow outline-none text-gray-700 text-sm sm:text-base   lg:text-lg pl-4"
    />

    {/* Close Button */}
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
