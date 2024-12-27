// Hamburger.js
import React from "react";
import "./hamburger.css";

const Hamburger = ({ isMenuOpen, toggleMenu }) => (
  <div className="hamburger-container">
    <input
      type="checkbox"
      id="hamburger-toggle"
      className="hamburger-toggle"
      hidden
      checked={isMenuOpen}
      onChange={toggleMenu}
    />
    <label htmlFor="hamburger-toggle" className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </label>
  </div>
);

export default Hamburger;