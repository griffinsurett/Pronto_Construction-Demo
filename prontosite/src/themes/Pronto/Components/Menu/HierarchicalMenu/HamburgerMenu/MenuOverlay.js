// MenuOverlay.js
import React from "react";

const MenuOverlay = ({ toggleMenu }) => (
  <div
    className="inset-0  z-40"
    onClick={toggleMenu}
  ></div>
);

export default MenuOverlay;
