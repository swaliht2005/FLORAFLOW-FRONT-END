import React from "react";
import Profileicon from "../assets/images/profileicon.png";

function ChatNavbar() {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 sm:p-6 shadow-md">
      {/* Left Section: Profile Image */}
      <div className="flex items-center space-x-3">
        <img
          src={Profileicon}
          alt="Profile"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div className="truncate">
          <p className="text-sm sm:text-base font-medium text-gray-900">
            (You)
          </p>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            Message yourself
          </p>
        </div>
      </div>

      {/* Right Section: Search Icon and Input */}
      <div className="h-[40px] w-full max-w-full sm:max-w-[300px] bg-white flex items-center px-2 sm:px-2 py-1 rounded-full shadow-sm">
  {/* Search Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-4.35-4.35M18 10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
    />
  </svg>

  {/* Input Field */}
  <input
    type="text"
    placeholder="Search within chat..."
    className="ml-2 flex-grow outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
  />
</div>

    </div>
  );
}

export default ChatNavbar;
