// Hamburger.js
import React from "react";

const Hamburger = ({ isMenuOpen, toggleMenu }) => (
  <div className="flex flex-col justify-between w-6 h-6 cursor-pointer" onClick={toggleMenu}>
    <span
      className={`block h-0.5 bg-gray-800 transform transition-transform duration-300 ${
        isMenuOpen ? "rotate-45 translate-y-1.5" : ""
      }`}
    ></span>
    <span
      className={`block h-0.5 bg-gray-800 transition-opacity duration-300 ${
        isMenuOpen ? "opacity-0" : "opacity-100"
      }`}
    ></span>
    <span
      className={`block h-0.5 bg-gray-800 transform transition-transform duration-300 ${
        isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
      }`}
    ></span>
  </div>
);

export default Hamburger;
