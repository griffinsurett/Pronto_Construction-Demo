// MobileMenuOverlay.js
import React from "react";
import "./menu-overlay.css";

const MobileMenuOverlay = ({ toggleMenu }) => (
  <div className="menu-overlay" onClick={toggleMenu}></div>
);

export default MobileMenuOverlay;
