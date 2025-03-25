

import React from "react";
import Aboutbgimg from "../assets/images/aboutbgimg.jpg";
import aboutimg from "../assets/images/aboutimg.png";
import aboutourimg from '../assets/images/aboutourimg.png';
import img from '../assets/images/images.jpg';
import forcostomer from '../assets/images/forcostomer.jpg'
import choice from '../assets/images/Choise.jpg' 
import forsellerce from '../assets/images/forsellerse.jpg'
import join from '../assets/images/jointhegreenrevelution.jpg'
import mission from '../assets/images/mission.jpg'
import our from '../assets/images/our.jpg'
import VisionSection from "./VisionSection";
// import TestimonialCard from "./TestimonialCard";
import forcosto from '../assets/images/pexels-shvetsa-5029818.jpg'
import greener from '../assets/images/pexels-shvetsa-5029776.jpg'
function Aboutme() {
  return (
    <div className="max-w-full w-full mx-auto  h-full  bg-gray-200 shadow-lg rounded-lg">
       
      {/* Background Section */}
      
      <div className=" w-full   relative ">
        <div className="relative z-10 flex items-center flex-col  h-60     "
        style={{
          backgroundImage:`url(${Aboutbgimg})`,
          backgroundAttachment: "fixed",
          backgroundSize:"contain",
        }}>
          <div className="absolute h-60 inset-0 bg-black bg-opacity-40  "></div>
          <h2 className=" md:text-4xl font-bold text-green-700 mt-8"
           >
            About Flora Flow
          </h2>
          <h3 className="text-lg md:text-xl font-semibold text-white text-center mt-2">
            Cultivating a Greener Planet, One Plant at a Time
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8 ">
        {/* About Paragraph */}
      
        <div className="w-full h-full border sm:flex sm:flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 sm:text-justify">
  <div className="w-[1100px] h-full border sm:flex sm:flex-col items-center space-y-4 lg:space-y-0 lg:space-x-8 sm:text-justify">
    <h2 className="text-gray-700 leading-7 font-serif sm:text-[12px] md:text-sm lg:text-lg xl:text-2xl lg:px-6 sm:flex-col hidden sm:block 
                  font-bold text-green-600 uppercase tracking-wide text-center py-4">
      Green Your Space, Green Your Life
    </h2>
    <p className="text-gray-700 leading-7 sm:text-sm md:text-lg lg:text-2xl font-serif flex-1 sm:text-left md:text-center lg:text-center">
      Welcome to Flora Flow, a platform dedicated to bringing nature closer
      to you while promoting sustainability and green living. At Flora
      Flow, we believe that plants are more than just decorative
      elements  they are a source of life, beauty, and well-being. 
      Whether you're a seasoned gardener or someone looking to add a touch 
      of green to your home or workspace, Flora Flow is here to make it 
      easy and enjoyable for everyone.
    </p>
  </div>


            <div className="h-[250px]  md:h-[300px] lg:h-[500px] w-[150px] relative left-10 lg:left-0 sm:w-[300px] md:w-[200px] lg:w-[300px] md:py-1 bg-gray-400 rounded-lg flex items-center justify-center z-10">
                <img
                  src={aboutimg}
                  alt="About Flora Flow"
                  className="w-full h-full object-cover rounded-lg shadow-lg sm:mt-4  rotate-12 "
                />
              </div>

          </div>
        </div>

        {/* Mission Section */}
        <div className="flex justify-between items-center  rounded-lg  
              sm:h-[150px] sm:w-[300px] sm:relative sm:top-16 
              md:h-[300px] md:w-full md:top-0 
              lg:h-[600px] lg:w-full  lg: lg:top-10 bg-gray-300 justify-betwee text-justify flex-col sm:flex-row  lg:flex-row ">
  {/* Mission Content */}
  <div className=" sm:w-[300px] sm:h-[150px] md:w-[450px] md:h-[300 lg:w-[920px]  lg:h-[500px] flex justify-center  items-center flex-col   relative left-7   lg:left-20">       
    <h3 className="text-center mt-4 font-custom text-green-700  text-3xl md:text-2xl lg:text-5xl hidden sm:block  ">
      Our Mission
    </h3>
    <p className="mt-4  text-justify text-gray-700 leading-7 font-serif   sm:text-[12px] md:text-sm lg:text-lg xl:text-2xl lg:px-6  sm:flex-col hidden sm:block   " >
    Our vision is to create a greener, healthier world where plants are an essential part
     of everyday life. We aim to make greenery universally accessible and affordable, 
     ensuring everyone can enjoy its benefits, regardless of location or budget.We believe 
     in the power of plants to enrich environments, improve well being, and foster harmony
      between people and nature. By promoting sustainable living and empowering communities,
       we strive to make greenery a natural part of homes, workplaces, and public spaces.Our
        mission is to build a thriving future where plants flourish everywhere, contributing
         to a healthier planet and a sustainable way of life for generations to come.
    </p>
   
    <VisionSection/>
  </div>
  
  {/* Placeholder Div */}
  <div className="h-[300px] w-[230px]  lg:h-full lg:w-[500px]   bg-gradient-to-r bg-gray1 z-10 relative left-[89px]   lg:left-0 md:left-10"
  style={{
    backgroundImage:`url(${our})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
  }}>
   <div className="absolute h-full inset-0 bg-black bg-opacity-70  "></div>
  <img src={mission} alt="" className="h-[250px] w-[200px] lg:h-[500px] lg:w-[400px] mt-7 relative right-20 lg:mt-16 lg:right-28"  />
  </div>
</div>


        {/* What We Offer */}
        <div className="mt-12 px-4 ">
  <h2 className="text-2xl md:text-4xl font-bold text-green-700 text-center">
    What We Offer
  </h2>
  <div className="flex flex-wrap justify-center lg:gap-10  md:gap-20 mt-8">
    {/* For Customers */}
    <div
      className="relative w-full sm:w-1/2  md:h-[500px]  md:w-[280px]   lg:w-[500px] shadow-cyan-500/50  h-80 sm:h-96 rounded-lg shadow-lg hover:shadow-xl bg-cover bg-center group"
      style={{
        backgroundImage: `url(${forcostomer})`,
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-green-700 bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <p className="text-white text-sm md:text-base lg:text-lg px-4">
          Flora Flow offers a seamless shopping experience with detailed plant
          information, customer reviews, and real-time chat. Secure payments
          and order tracking ensure convenience and safety.
        </p>
      </div>
      <h3 className="absolute bottom-4 left-4 text-white text-lg sm:text-xl font-semibold opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        For Customers:
      </h3>
    </div>

    {/* For Sellers */}
    <div
      className="relative w-full sm:w-1/2 lg:w-[500px] lg:h-[500px] md:h-[500px]   md:w-[280px] shadow-cyan-500/50  h-80 sm:h-96 rounded-lg shadow-lg hover:shadow-xl bg-cover bg-center group"
      style={{
        backgroundImage: `url(${forsellerce})`,
      }}
    >
      <div className="absolute inset-0 bg-green-700 bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <p className="text-white text-sm md:text-base lg:text-lg px-4">
          Flora Flow simplifies selling with features like inventory management,
          real-time notifications, and live chats to help sellers engage
          effectively and securely.
        </p>
      </div>
      <h3 className="absolute bottom-4 left-4 text-white  text-lg sm:text-xl font-semibold opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        For Sellers:
      </h3>
    </div>
    {/* <TestimonialCard/> */}
    <div
      className="relative w-full sm:w-1/2  md:h-[500px]  md:w-[280px]   lg:w-[500px] shadow-cyan-500/50  h-80 sm:h-96 rounded-lg shadow-lg hover:shadow-xl bg-cover bg-center group"
      style={{
        backgroundImage: `url(${forcosto})`,
        backgroundPosition: "center",
      }}
    >
       <div className="absolute inset-0 bg-green-700 bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
        <p className="text-sm sm:text-base md:text-lg text-gray-100 text-center px-4 leading-6 sm:leading-7 group-hover:text-white group-hover:rounded-md group-hover:p-4 transition-all">
        Flora Flow is committed to promoting sustainability. By supporting
          local sellers and making greenery accessible to everyone, we’re
          creating a healthier planet for future generations.
        </p>
        
      </div>
     </div>
  </div>
</div>

<div className="flex flex-col lg:flex-row w-full items-center lg:justify-center">
  {/* Why Choose Flora Flow */}
  <div className="w-full px-6 lg:w-1/3">
    <h2 className="text-2xl lg:text-4xl md:text-2xl font-bold text-green-700 mt-10 text-center lg:text-left">
      Why Choose Flora Flow?
    </h2>
    <div
      className="h-80 lg:h-[400px] w-full mt-6 border p-6 rounded-lg shadow-lg hover:shadow-xl shadow-cyan-500/50 relative group mx-auto lg:mx-0"
      style={{
        backgroundImage: `url(${choice})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-green-700 bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
        <p className="text-gray-100 text-center px-4 leading-7 group-hover:text-white group-hover:rounded-md group-hover:p-4 transition-all">
          Flora Flow isn’t just a marketplace; it’s a community of plant lovers,
          environmental enthusiasts, and sustainable living advocates. By
          choosing Flora Flow, you’re enriching your life with the beauty of
          plants while contributing to a global effort to create a greener, more
          sustainable future.
        </p>
      </div>
    </div>
  </div>

  {/* Join the Green Revolution */}
  <div className="w-full px-6 lg:w-1/3 mt-8 lg:mt-0">
    <h2 className="text-2xl lg:text-4xl md:text-2xl mt-9 font-bold text-green-700 text-center lg:text-left">
      Join the Green Revolution
    </h2>
    <div
      className="h-80 lg:h-[400px] w-full mt-6 border p-6 rounded-lg shadow-lg hover:shadow-xl shadow-cyan-500/50 relative group mx-auto lg:mx-0"
      style={{
        backgroundImage: `url(${join})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-green-700 bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
        <p className="text-sm sm:text-base md:text-lg text-gray-100 text-center px-4 leading-6 sm:leading-7 group-hover:text-white group-hover:rounded-md group-hover:p-4 transition-all">
          Whether you're looking to beautify your surroundings, support
          small-scale sellers, or contribute to environmental well-being, Flora
          Flow is your trusted partner. Let’s work together to make greenery an
          essential part of our lives and create a thriving, sustainable
          community.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-green-700 font-semibold mt-2 sm:mt-4">
          Discover Flora Flow today. Cultivate green, inspire change.
        </p>
      </div>
    </div>
  </div>

  {/* Additional Image (Optional Section) */}
  <div className="w-full lg:w-1/3 px-6   lg:mt-0">
   
     <div
      className="relative w-full sm:w-1/2  md:h-[500px]  md:w-[280px]   lg:w-[500px]  lg:h-[400px] mt-20 shadow-cyan-500/50  h-80 sm:h-96 rounded-lg shadow-lg hover:shadow-xl bg-cover bg-center group"
      style={{
        backgroundImage: `url(${greener})`,
        backgroundPosition: "center",
      }}
    >
     <div className="absolute inset-0 bg-green-700 bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
        <p className="text-sm sm:text-base md:text-lg text-gray-100 text-center px-4 leading-6 sm:leading-7 group-hover:text-white group-hover:rounded-md group-hover:p-4 transition-all">
        Imagine a world where every home has a touch of green, 
                where communities thrive through sustainable practices, 
                and where nature flourishes. 
                Flora Flow is making this vision a reality. 
                Join us in creating a greener, healthier planet.
        </p>
       
      </div>
      </div>
  </div>
</div>


  </div>


 
      
  );
}

export default Aboutme;



