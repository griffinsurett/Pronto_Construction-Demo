// WhyChooseUs.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhyChooseUs = ({ data }) => {
  const items = data?.items || []; // Validate `data.items`

  if (!items.length) {
    console.warn("WhyChooseUs: No data items provided.");
    return <p>Why Choose Us section data is missing.</p>;
  }

  return (
    <section className="why-choose-us">
      <h2>{data?.title || "Why Choose Us"}</h2>
      {data?.heading && <h3>{data.heading}</h3>}
      <ul className="why-choose-us-list">
        {items.map((item, index) => (
          <li key={index} className="why-choose-us-item">
            {/* Render the icon only if it exists */}
            {item.icon && <FontAwesomeIcon icon={item.icon} className="icon" />}
            <h3>{item.title || "Untitled Benefit"}</h3>
            <p>{item.description || "No description provided."}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyChooseUs;
