// About/Benefits.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getItemData } from "../../../GetItems"; // NEW import
import PropTypes from "prop-types";

const Benefits = ({ data }) => {
  const items = getItemData(data);

  if (!items.length) {
    return null;
  }

  return (
    <Section className="benefits-section" id="benefits">
      <ContentTemplate data={data} sectionButtonText="View All Benefits">
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </ContentTemplate>
    </Section>
  );
};

Benefits.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Benefits;
