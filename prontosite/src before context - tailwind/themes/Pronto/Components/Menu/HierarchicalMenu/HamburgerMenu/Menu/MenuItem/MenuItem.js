// MenuItem.js
import React from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../../../../ArrowIcon/ArrowIcon";
import "./menu-item.css";

const MenuItem = ({ item, handleSubmenuClick, toggleMenu }) => (
  <li className="menu-item">
    <div className="menu-item-content">
      <Link to={item.slug} className="menu-link" onClick={toggleMenu}>
        {item.title}
      </Link>
      {item.items && item.items.length > 0 && (
        <button
          className="submenu-toggle"
          onClick={() => handleSubmenuClick(item.items)}
        >
          <ArrowIcon direction="left" size={16} />
        </button>
      )}
    </div>
  </li>
);

export default MenuItem;
