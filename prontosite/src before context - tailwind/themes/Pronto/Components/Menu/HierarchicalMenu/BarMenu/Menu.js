// Menu.js
import React from "react";
import MenuList from "./MenuList";
import "./menu.css";

const Menu = ({ menuItems }) => (
  <ul className="menu-list">
    <MenuList items={menuItems} />
  </ul>
);

export default Menu;
