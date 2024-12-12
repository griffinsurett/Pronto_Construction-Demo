import React from "react";
import { Link } from "react-router-dom";
import "./cta-section.css";

const CTASection = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) {
    console.error("CTASection: No data provided or no items available.");
    return null;
  }

  return (
    <section className="cta-section">
      <div className="cta-container">
        {data.items.map((item, index) => (
          <a key={index} href={item.link} className="cta-button">
            {item.title}
          </a>
        ))}
      </div>
    </section>
  );
};

export default CTASection;
