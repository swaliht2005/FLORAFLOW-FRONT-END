import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, PlusCircleIcon, UsersIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/addproduct', label: 'Add Products', icon: PlusCircleIcon },
    { path: '/myPlants', label: 'My Plants', icon: HomeIcon },
    { path: '/chatapp', label: 'Customers', icon: UsersIcon },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-28 left-4 z-50 p-2 bg-green-900 text-white rounded-md shadow-md focus:outline-none ${isOpen ? 'hidden' : ''}`}
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 lg:w-72 bg-green-900 shadow-md transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0 flex flex-col' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between py-6 px-4 border-b border-green-800">
          <h2 className="text-xl font-semibold text-white">Flora Flow</h2>
          <button
            className="p-2 text-white focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)} // Close sidebar on link click
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-green-600 text-white' : 'text-gray-200 hover:bg-green-700 hover:text-white'}`}
                aria-label={`Navigate to ${item.label}`}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}

export default Sidebar;