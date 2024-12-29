// Menu.js
import React from "react";
import MenuItem from "./MenuItem";
import BackButton from "./BackButton";

const Menu = ({
  currentMenu,
  menuHistory,
  handleSubmenuClick,
  handleBackClick,
  toggleMenu,
}) => (
  <ul className="flex flex-col items-center justify-center min-h-full space-y-4">
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

export default Menu;
