import React from "react";
import forcostomer from '../assets/images/pexels-shvetsa-5029818.jpg'
import logo from '../assets/images/FloraflowLogo.png'
function TestimonialCard() {
  return (
    <div className="bg-white rounded-lg shadow-md    p-6  mx-auto">
      <div className="relative">
        <img
          src={forcostomer} // Replace this with your image URL
          alt="Testimonial"
          className="rounded-lg w-96 h-[400px] hover:shadow-xl shadow-cyan-500/50"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-lg font-medium mb-2">
          {/* Flora Flow offers a seamless shopping experience with detailed plant
          information, customer reviews, and real-time chat. Secure payments
          and order tracking ensure convenience and safety. */}
          </p>
          <p className="text-sm font-semibold">Flora flow</p>
          <p className="text-sm">Owner, swalih</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-gray-500">
        <div className="flex items-center gap-2">
          <img
            src={logo} // Replace with a logo or icon image
            alt="Chibi Nursery Logo"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium">Flora flow</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
