import React from "react";

const Button = ({ children, icon }) => {
  return (
    <button className="relative transition-all duration-300 ease-in-out shadow-lg py-2 px-5 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer text-white gap-2 font-bold border-3 border-white/30 outline-none overflow-hidden text-sm">
      {icon && <span className="w-6 h-6 transition-all duration-300 ease-in-out">{icon}</span>}
      {children}
      <span className="absolute w-24 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent top-0 left-[-100px] opacity-60 before:hover:animate-shine"></span>
    </button>
  );
};



export default Button;
