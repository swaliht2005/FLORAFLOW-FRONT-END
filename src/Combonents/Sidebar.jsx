import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col w-64 bg-gray-100 shadow-md ">
     
      <nav className="flex-1 p-4">
        <Link to="/addproduct" className="block py-2 px-4 text-indigo-600 bg-indigo-100 hover:bg-indigo-200 rounded-md font-semibold">
          Add Products
        </Link>
        <Link to="/MyPlants" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
          My Plants
        </Link>
        <Link to="/categories" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
          Category
        </Link>
      
      </nav>
    </div>
  );
}

export default Sidebar;