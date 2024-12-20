// HamburgerMenu.js
import React, { useState, useEffect } from "react";
import Menu from "./Menu/Menu";
import MenuOverlay from "./Menu/MenuOverlay/MenuOverlay";
import "./hamburger-menu.css";

const HamburgerMenu = ({ menuItems, isMenuOpen, toggleMenu }) => {
  const [currentMenu, setCurrentMenu] = useState(menuItems);
  const [menuHistory, setMenuHistory] = useState([]);

  // Reset menu state when the menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setCurrentMenu(menuItems);
      setMenuHistory([]);
    }
  }, [isMenuOpen, menuItems]);

  const handleSubmenuClick = (submenu) => {
    setMenuHistory((prevHistory) => [...prevHistory, currentMenu]);
    setCurrentMenu(submenu);
  };

  const handleBackClick = () => {
    const previousMenu = menuHistory.pop();
    setCurrentMenu(previousMenu);
    setMenuHistory([...menuHistory]);
  };

  return (
    <>
      {isMenuOpen && <MenuOverlay toggleMenu={toggleMenu} />}
      {isMenuOpen && (
        <Menu
          currentMenu={currentMenu}
          menuHistory={menuHistory}
          handleSubmenuClick={handleSubmenuClick}
          handleBackClick={handleBackClick}
          toggleMenu={toggleMenu}
        />
      )}
    </>
  );
};

export default HamburgerMenu;
