// Footer.js
import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ siteSettings }) => {
  const footerMenu = siteSettings.queries.find((query) => query.name === "Footer");
  // const contactMenu = siteSettings.queries.find((query) => query.name === "Contact Info");
  const socialMenu = siteSettings.queries.find((query) => query.name === "Social Media");
  const ctaMenu = siteSettings.queries.find((query) => query.name === "CTA");

  return (
    <footer className="site-footer">
       <ul className="footer-menu">
          {footerMenu?.items.map((item, index) => (
            <li key={index} className="footer-item">
              <a href={item.slug || item.link}>{item.title}</a>
            </li>
          ))}
        </ul>

      {/* <div className="container footer-content"> */}

        <ul className="cta-menu">
          {ctaMenu?.items.map((item, index) => (
            <li key={index} className="cta-item">
              <a href={item.link || item.link}>{item.title}</a>
            </li>
          ))}
        </ul>

        {/* {contactMenu && (
          <ul className="contact-menu">
            <h4>Contact Info</h4>
            {contactMenu.items.map((item, index) => (
              <li key={index} className="contact-item">
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        )} */}

        {socialMenu && (
          <ul className="social-menu">
            <h4>Follow Us</h4>
            {socialMenu.items.map((item, index) => (
              <li key={index} className="social-item">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={item.icon} />
                </a>
              </li>
            ))}
          </ul>
        )}
      {/* </div> */}
      <p>{siteSettings.Copyright}</p>

    </footer>
  );
};

export default Footer;
