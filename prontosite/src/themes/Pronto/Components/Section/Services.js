// Services.js
import React from "react";
import ContentTemplate from "../ContentTemplate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Services = ({ data }) => {
  if (!data) return <p>No Services section data available.</p>;

  return (
    <ContentTemplate data={data} sectionButtonText="Explore All Services">
      <div className="services-list">
        {data.items.map((service, index) => (
          <div key={index} className="service-item">
            <FontAwesomeIcon icon={service.icon} className="service-icon" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.slug && (
              <Link to={service.slug} className="service-link">
                Learn More
              </Link>
            )}
          </div>
        ))}
      </div>
    </ContentTemplate>
  );
};

export default Services;