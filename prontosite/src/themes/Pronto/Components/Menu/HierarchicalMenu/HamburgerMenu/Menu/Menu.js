// MobileMenu.js
import React from "react";
import MenuItem from "./MenuItem/MenuItem";
import BackButton from "./BackButton/BackButton";
import "./menu.css";

const MobileMenu = ({
  currentMenu,
  menuHistory,
  handleSubmenuClick,
  handleBackClick,
  toggleMenu,
}) => (
  <ul className="mobile-menu">
    {menuHistory.length > 0 && <BackButton handleBackClick={handleBackClick} />}
    {currentMenu.map((item, index) => (
      <MenuItem
        key={index}
        item={item}
        handleSubmenuClick={handleSubmenuClick}
        toggleMenu={toggleMenu}
      />
    ))}
  </ul>
);

export default MobileMenu;
