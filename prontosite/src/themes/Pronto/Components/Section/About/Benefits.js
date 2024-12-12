import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Benefits = ({ data }) => {
  // Validate data structure
  if (!data || !Array.isArray(data.items)) {
    console.error("Benefits: Missing or invalid data.items.");
    return <p>Benefits section data is missing.</p>;
  }

  return (
    <section className="benefits">
      <h2>{data.title || "Benefits"}</h2>
      {data.heading && <h3>{data.heading}</h3>}
      <ul className="benefits-list">
        {data.items.map((item, index) => (
          <li key={index} className="benefit-item">
            {item.icon && (
              <FontAwesomeIcon icon={item.icon} className="icon" />
            )}
            {item.title && <h4>{item.title}</h4>}
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Benefits;
