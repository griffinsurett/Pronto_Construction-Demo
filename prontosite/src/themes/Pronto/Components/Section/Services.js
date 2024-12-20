// Services.js
import React from "react";
import ContentTemplate from "../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Services = ({ data }) => {
  const items = data?.items || []; // Fallback for missing items

  return (
    <ContentTemplate
      data={data}
      sectionButtonText="View All Services" // Button Text
      showSectionButton={!!data.slug} // Conditionally show the button
      sectionSlug={data.slug} // Pass the slug to the ContentTemplate
    >
      {/* Service Items */}
      {items.length > 0 ? (
        <ul className="services-list">
          {items.map((item, index) => (
            <li key={index} className="service-item">
              {item.icon && (
                <FontAwesomeIcon icon={item.icon} className="service-icon" />
              )}
              <h3>{item.title || "Service Title"}</h3>
              <p>{item.description || "No description available."}</p>
              <Link to={item.slug} className="service-link">
                Learn More
              </Link>            </li>
          ))}
        </ul>
      ) : (
        <p>No services available at this time.</p>
      )}
    </ContentTemplate>
  );
};

export default Services;