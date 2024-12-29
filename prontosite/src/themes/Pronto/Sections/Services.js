// Services.js
import React from "react";
import Section from "../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../Components/ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getItemData } from "../GetItems"; // NEW import
import PropTypes from "prop-types";

const Services = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="services">
      <ContentTemplate
        data={data}
        sectionButtonText="View All Services"
        sectionSlug={data.slug}
      >
        {items.length > 0 ? (
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li key={index} className="flex flex-col">
                {item.icon && (
                  <FontAwesomeIcon icon={item.icon} className="w-8 h-8" />
                )}
                <h3 className="font-semibold">{item.title || "Service Title"}</h3>
                <p>{item.description || "No description available."}</p>
                {item.hasPage && item.slug && (
                  <Link
                    to={item.slug}
                    className="hover:underline"
                  >
                    {`See ${item.title || "Service"} details`}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No services available at this time.</p>
        )}
      </ContentTemplate>
    </Section>
  );
};

Services.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Services;
