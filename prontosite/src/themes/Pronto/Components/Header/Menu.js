import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Menu = ({ siteSettings, isMenuOpen }) => {
  const primaryMenu = siteSettings.queries.find((query) => query.name === "Primary");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenSubmenu(index); // Open the hovered submenu
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null); // Close the submenu when mouse leaves
  };

  const handleItemClick = () => {
    setOpenSubmenu(null); // Explicitly close the submenu when an item is clicked
  };

  return (
    <nav className={`site-nav ${isMenuOpen ? "open" : ""}`}>
      <ul className="menu-list">
        {primaryMenu?.items.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${openSubmenu === index ? "open" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="submenu-container">
              {item.slug ? (
                <Link to={item.slug} onClick={handleItemClick}>
                  {item.title}
                </Link>
              ) : (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleItemClick}
                >
                  {item.title}
                </a>
              )}
              {item.items?.length > 0 && (
                <span className="submenu-indicator">▼</span>
              )}
            </div>
            {item.items?.length > 0 && (
              <ul
                className={`submenu ${openSubmenu === index ? "open" : ""}`}
                onClick={handleItemClick} // Ensure the submenu itself closes on click
              >
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {subItem.slug ? (
                      <Link to={subItem.slug} onClick={handleItemClick}>
                        {subItem.title}
                      </Link>
                    ) : (
                      <a
                        href={subItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleItemClick}
                      >
                        {subItem.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
