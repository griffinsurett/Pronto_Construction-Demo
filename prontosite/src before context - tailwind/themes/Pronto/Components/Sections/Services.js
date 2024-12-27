// Services.js
import React from "react";
import Section from "../Section"; // Adjust the import path as necessary
import ContentTemplate from "../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getItemData } from "../../GetItems"; // NEW import
import PropTypes from "prop-types";

const Services = ({ data }) => {
  // Use our new utility to get items
  const items = getItemData(data);

  return (
    <Section className="services-section" id="services">
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
                    {`See ${item.title || "Service"} details`}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No services available at this time.</p>
        )}
      </ContentTemplate>
    </Section>
  );
};

Services.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Services;