// src/themes/Pronto/Components/Menu/HierarchicalMenu/BarMenu/Menu.js
import React from "react";
import MenuList from "./MenuList";

const Menu = ({ menuItems }) => (
  <ul className="flex space-x-6">
    <MenuList items={menuItems} />
  </ul>
);

export default Menu;
