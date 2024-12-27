import React from "react";
import "./header.css";
import NavMenu from "./NavMenu/NavMenu";
import { Link } from "react-router-dom";

const Header = ({ siteSettings, menuManager }) => {
  return (
    <header className="site-header">
      <div className="header-content">
        {/* Left section */}
        <div className="nav-left">
          <Link to="/">
            <img
              src={siteSettings.siteLogo}
              alt={siteSettings.siteTitle}
              className="site-logo"
            />
            <h1 className="site-title">{siteSettings.siteTitle}</h1>
          </Link>
        </div>
        {/* Right section */}
        <div className="nav-right">
          <NavMenu menuManager={menuManager} />
        </div>
      </div>
    </header>
  );
};

export default Header;
