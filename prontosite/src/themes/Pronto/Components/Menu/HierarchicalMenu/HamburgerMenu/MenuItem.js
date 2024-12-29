// MenuItem.js
import React from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../../ArrowIcon";

const MenuItem = ({ item, handleSubmenuClick, toggleMenu }) => (
  <li className="w-full">
    <div className="flex items-center justify-between w-full px-4 py-2">
      <Link
        to={item.slug}
        className="text-gray-800 hover:underline"
        onClick={toggleMenu}
      >
        {item.title}
      </Link>
      {item.items && item.items.length > 0 && (
        <button
          className="focus:outline-none"
          onClick={() => handleSubmenuClick(item.items)}
        >
          <ArrowIcon direction="left" size={16} />
        </button>
      )}
    </div>
  </li>
);

export default MenuItem;
