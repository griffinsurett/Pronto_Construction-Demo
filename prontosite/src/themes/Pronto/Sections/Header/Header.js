// Header.js
import React from "react";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";

const Header = ({ siteSettings, menuManager }) => {
  return (
    <header
      className="py-4 px-5"
      style={{
        zIndex: 1000, // Ensure it is above the overlay
      }}
    >
      <div className="flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={siteSettings.siteLogo}
              alt={siteSettings.siteTitle}
              className="w-16 mr-3"
            />
            <h1 className="text-xl font-semibold">{siteSettings.siteTitle}</h1>
          </Link>
        </div>
        {/* Right section */}
        <div className="flex items-center">
          <NavMenu menuManager={menuManager} />
        </div>
      </div>
    </header>
  );
};

export default Header;
