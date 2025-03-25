

import React from "react";
import logo from '../assets/images/FloraflowLogo.png'
import news1 from '../assets/images/Alocasia.jpg'
import news2 from '../assets/images/bonsai.png'
import linkdin from '../assets/images/linkedin-.png'
import phone from '../assets/images/phone.png'
import email from '../assets/images/icons8-email-30.png'
import location from '../assets/images/location.png'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16">
      {/* Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Widget 1 - Logo & Description */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img
                src={logo}
                alt="Flowra flow Logo"
                className="w-20"
              />
               <h3 className="font-handwriting text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Flora Flow
          </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
            Flowra Flow is dedicated to promoting greenery and sustainability. Join us in making the planet a greener place to live.
            </p>
            <div className="flex space-x-3 mt-6">
            <div className="flex items-center gap-6">
                  
                   <a
                     href="mailto:salumuhammadswalih@gmail.com"
                     className="text-sm sm:text-base hover:text-gray-300"
                   >
                   <img src={email} alt="Email" className="h-8 sm:h-10" />
                   </a>
                 </div>
          <div className="flex items-center gap-4">
                 
                  <a
                    href="tel:8095635402"
                    className="text-sm sm:text-base hover:text-gray-300"
                  >
                   <img src={phone} alt="Phone" className="h-8 sm:h-10" />
                  </a>
                </div>
        
                
        
               
                <div className="flex items-center gap-4">
                 
                  <a
                    href="https://www.google.com/maps/search/calicut+kinfra/@11.207134,75.750338,12z/data=!3m1!4b1?authuser=0&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
                    className="text-sm sm:text-base hover:text-gray-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={location} alt="GitHub" className="h-8 sm:h-10" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/muhammed-swalih-3a12b931a/"
                    className="text-sm sm:text-base hover:text-gray-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      <img src={linkdin} alt="LinkedIn" className="h-8 sm:h-10" />
                  </a>
                </div>
        </div>

        {/* Follow Us */}
        <div>
        
          {/* LinkedIn */}
          <div className="flex items-center gap-4">
               
                 
                </div>
            </div>
          </div>

          {/* Widget 2 - Latest News */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Latest News</h5>
            <div className="flex items-start mb-4">
              <img
                src={news1}
                alt="News 1"
                className="w-20 h-20 object-cover mr-4"
              />
              <div>
                <a href="#" className="text-white hover:text-yellow-500">
                How Urban Gardening is Changing the Way We Live
                </a>
                <span className="block text-yellow-500 text-sm mt-2">
                Date: Jan 18, 2025
                </span>
              </div>
            </div>
            <div className="flex items-start">
              <img
                src={news2}
                alt="News 2"
                className="w-20 h-20 object-cover mr-4"
              />
              <div>
                <a href="#" className="text-white hover:text-yellow-500">
                Top 5 Indoor Plants for Cleaner Air in 2025
                </a>
                <span className="block text-yellow-500 text-sm mt-2">
                Date: Jan 20, 2025
                </span>
              </div>
            </div>
          </div>

          {/* Widget 3 - Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Quick Links</h5>
            <ul>
              <li className="mb-2">
                <a href="/homePage" className="text-gray-400 hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-gray-400 hover:text-yellow-500">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="/addproduct" className="text-gray-400 hover:text-yellow-500">
                Add Plants
                </a>
              </li>
              <li className="mb-2">
                <a href="/favorite" className="text-gray-400 hover:text-yellow-500">
                Favorite
                </a>
              </li>
             
            </ul>
          </div>

          {/* Widget 4 - Other Links */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Other Links</h5>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">
                  Themeforest
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">
                  Graphicriver
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">
                  Codecanyon
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">
                  Videohive
                </a>
              </li>
             
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Area */}
      <div className="bg-gray-800 text-center py-6 mt-16">
        <p className="text-gray-400">
          &copy; Copyright All rights reserved 2019.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
