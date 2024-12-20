// MenuItem.js
import React, { useState, useEffect } from "react";
import Submenu from "../../Submenu/Submenu";
import ArrowIcon from "../../../../ArrowIcon/ArrowIcon";
import { Link, useLocation } from "react-router-dom";
import "./menu-item.css";

const MenuItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Reset hover state on route change
  useEffect(() => {
    setIsHovered(false);
  }, [location]);

  return (
    <li
      className={`menu-item ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="submenu-container">
        <Link to={item.slug} className="menu-link">
          {item.title}
        </Link>
        {item.items && item.items.length > 0 && (
          <>
            <button className="submenu-toggle">
              <ArrowIcon direction={isHovered ? "up" : "down"} size={12} />
            </button>
            <Submenu items={item.items} />
          </>
        )}
      </div>
    </li>
  );
};

export default MenuItem;
