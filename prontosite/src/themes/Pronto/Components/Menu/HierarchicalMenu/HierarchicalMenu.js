// HierarchicalMenu.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hamburger from "./HamburgerMenu/HamburgerIcon";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Menu from "./BarMenu/Menu";

const HierarchicalMenu = ({
  menuItems,
  isResponsive = true,
  hamburgerOnly = false,
  breakpoint = 768,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= breakpoint;
      setIsHamburgerVisible(hamburgerOnly || (isResponsive && isMobile));
      if (!isMobile) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint, hamburgerOnly, isResponsive]);

  useEffect(() => {
    if (isResponsive && window.innerWidth <= breakpoint) {
      setIsMenuOpen(false);
    }
  }, [location.pathname, isResponsive, breakpoint]);

  return (
    <>
      {isHamburgerVisible && <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
      {!isHamburgerVisible && (
        <nav className="flex space-x-6">
          <Menu menuItems={menuItems} />
        </nav>
      )}
      {isHamburgerVisible && (
        <HamburgerMenu menuItems={menuItems} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      )}
    </>
  );
};

export default HierarchicalMenu;
