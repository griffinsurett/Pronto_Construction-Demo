// Benefits.js
import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import { getItemData } from "../../GetItems"; // Import getItemData
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Benefits = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="benefits">
      <ContentTemplate data={data} sectionButtonText="View All Benefits">
        {items.length > 0 ? (
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <FontAwesomeIcon icon={item.icon} />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No benefits available at this time.</p>
        )}
      </ContentTemplate>
    </Section>
  );
};

Benefits.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Benefits;
