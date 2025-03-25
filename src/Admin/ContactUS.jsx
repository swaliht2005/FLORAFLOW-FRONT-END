

import React from "react";
import FloraflowLogo from "../assets/images/FloraflowLogo.png";
import phone from "../assets/images/phone.png";
import linkdin from "../assets/images/linkedin-.png";
import location from "../assets/images/location.png";
import email from "../assets/images/icons8-email-30.png";

function ContactUS() {
  return (
    <div className="h-auto min-h-[500px] w-full bg-customGray flex flex-col lg:flex-row  items-center lg:items-start lg:justify-between p-5 lg:px-20">
      {/* Logo Section */}
      <div className="mb-5 lg:mb-0 flex justify-center">
        <img
          src={FloraflowLogo}
          alt="FloraFlow Logo"
          className="h-16 sm:h-20 lg:h-72 lg:mt-24"
        />
      </div>

      {/* Contact Links Section */}
      <div className="text-white flex flex-col   lg:mt-36  lg:mr-52 gap-5">
        {/* Phone */}
        <div className="flex items-center gap-4">
          <img src={phone} alt="Phone" className="h-8 sm:h-10" />
          <a
            href="tel:8095635402"
            className="text-sm sm:text-base hover:text-gray-300"
          >
            8095635402
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center gap-4">
          <img src={linkdin} alt="LinkedIn" className="h-8 sm:h-10" />
          <a
            href="https://www.linkedin.com/in/muhammed-swalih-3a12b931a/"
            className="text-sm sm:text-base hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click To LinkedIn
          </a>
        </div>

        {/* GitHub */}
        <div className="flex items-center gap-4">
          <img src={location} alt="GitHub" className="h-8 sm:h-10" />
          <a
            href="https://www.google.com/maps/search/calicut+kinfra/@11.207134,75.750338,12z/data=!3m1!4b1?authuser=0&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
            className="text-sm sm:text-base hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calicut Kinfra
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <img src={email} alt="Email" className="h-8 sm:h-10" />
          <a
            href="mailto:salumuhammadswalih@gmail.com"
            className="text-sm sm:text-base hover:text-gray-300"
          >
            Click To Email
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUS;
