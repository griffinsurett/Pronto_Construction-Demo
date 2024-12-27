// Footer.js
import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ menuManager, siteSettings }) => {
  const footerMenu = menuManager.getFlatMenu("Footer");
  const socialMenu = menuManager.getFlatMenu("Social Media");

  return (
    <footer className="site-footer">
      <ul className="footer-menu">
        {footerMenu.map((item, index) => (
          <li key={index}>
            <a href={item.link || item.slug}>{item.title}</a>
          </li>
        ))}
      </ul>
      <ul className="social-menu">
        {socialMenu.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={item.icon} />
            </a>
          </li>
        ))}
      </ul>
      <p>{siteSettings.Copyright}</p>
    </footer>
  );
};

export default Footer;