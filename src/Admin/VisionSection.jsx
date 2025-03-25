import React, { useState } from "react";

const VisionSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4 text-justify text-gray-700 font-light leading-7 sm:text-[12px] md:text-sm p-10 relative right-8  lg:hidden xl:text-2xl lg:px-6 sm:flex-col  md:hidden ">
         <h3 className="text-center mt-4 font-custom text-green-700  text-3xl md:text-lg lg:text-5xl">
        Our Mission
        </h3>
      <p>
        Our vision is to create a greener, healthier world where plants are an
        essential part of everyday life. We aim to make greenery universally
        accessible and affordable, ensuring everyone can enjoy its benefits,
        regardless of location or budget.
      </p>

      {isExpanded && (
        <p>
          We believe in the power of plants to enrich environments, improve
          well-being, and foster harmony between people and nature. By promoting
          sustainable living and empowering communities, we strive to make
          greenery a natural part of homes, workplaces, and public spaces. Our
          mission is to build a thriving future where plants flourish
          everywhere, contributing to a healthier planet and a sustainable way
          of life for generations to come.
        </p>
      )}

      <button
        className="mt-4 text-blue-500 hover:underline focus:outline-none"
        onClick={toggleContent}
      >
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
};

export default VisionSection;
