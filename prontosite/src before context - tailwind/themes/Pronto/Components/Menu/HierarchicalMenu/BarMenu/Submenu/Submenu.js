// Submenu.js
import React from "react";
import MenuList from "../MenuList";
import "./submenu.css";

const Submenu = ({ items }) => (
  <ul className="submenu">
    <MenuList items={items} />
  </ul>
);

export default Submenu;
