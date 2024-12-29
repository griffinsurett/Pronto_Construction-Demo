// Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ menuManager, siteSettings }) => {
  const footerMenu = menuManager.getFlatMenu("Footer");
  const socialMenu = menuManager.getFlatMenu("Social Media");

  return (
    <footer>
      {/* Footer Menu */}
      <ul className="flex flex-wrap">
        {footerMenu.map((item, index) => (
          <li key={index}>
            <a href={item.link || item.slug} className="hover:underline">
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Social Menu */}
      <ul className="flex">
        {socialMenu.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
            </a>
          </li>
        ))}
      </ul>

      {/* Footer Text */}
      <p className="text-sm">{siteSettings.Copyright}</p>
    </footer>
  );
};

export default Footer;