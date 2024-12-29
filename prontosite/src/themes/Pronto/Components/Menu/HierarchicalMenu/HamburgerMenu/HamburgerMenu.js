// HamburgerMenu.js
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
// import MenuOverlay from "./Menu/MenuOverlay/MenuOverlay";

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
      {/* {isMenuOpen && <MenuOverlay toggleMenu={toggleMenu} />} */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white overflow-y-auto">
          <Menu
            currentMenu={currentMenu}
            menuHistory={menuHistory}
            handleSubmenuClick={handleSubmenuClick}
            handleBackClick={handleBackClick}
            toggleMenu={toggleMenu}
          />
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
