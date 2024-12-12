import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhyChooseUs = ({ data }) => {
  // Validate data structure
  if (!data || !Array.isArray(data.items)) {
    console.error("WhyChooseUs: Missing or invalid data.items.");
    return <p>Why Choose Us section data is missing.</p>;
  }

  return (
    <section className="why-choose-us">
      <h2>{data.title || "Why Choose Us"}</h2>
      {data.heading && <h3>{data.heading}</h3>}
      <ul className="why-choose-us-list">
        {data.items.map((item, index) => (
          <li key={index} className="why-choose-us-item">
            {item.icon && <FontAwesomeIcon icon={item.icon} className="icon" />}
            {item.title && <h3>{item.title}</h3>}
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyChooseUs;
