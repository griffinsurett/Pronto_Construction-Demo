// Submenu.js
import React from "react";
import MenuList from "./MenuList";

const Submenu = ({ items, isVisible }) => (
  <ul
    className={`absolute left-0 top-full bg-white border border-gray-200 shadow-lg rounded-md transition-all duration-300 ${
      isVisible ? "block opacity-100" : "hidden opacity-0"
    }`}
  >
    <MenuList items={items} />
  </ul>
);

export default Submenu;
