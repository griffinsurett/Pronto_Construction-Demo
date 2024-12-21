// Services.js
import React from "react";
import ContentTemplate from "../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getItemData } from "../../GetItems"; // NEW import

const Services = ({ data }) => {
  // Use our new utility to get items
  const items = getItemData(data);

  return (
    <ContentTemplate
      data={data}
      sectionButtonText="View All Services"
      showSectionButton={!!data.slug}
      sectionSlug={data.slug}
    >
      {items.length > 0 ? (
        <ul className="services-list">
          {items.map((item, index) => (
            <li key={index} className="service-item">
              {item.icon && (
                <FontAwesomeIcon icon={item.icon} className="service-icon" />
              )}
              <h3>{item.title || "Service Title"}</h3>
              <p>{item.description || "No description available."}</p>
              {item.hasPage && item.slug && (
                <Link to={item.slug} className="service-link">
                  Learn More
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available at this time.</p>
      )}
    </ContentTemplate>
  );
};

export default Services;
