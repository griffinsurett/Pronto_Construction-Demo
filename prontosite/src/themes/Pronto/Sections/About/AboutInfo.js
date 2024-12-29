// AboutInfo.js
import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import { getItemData } from "../../GetItems"; // Import getItemData
import PropTypes from "prop-types";

const AboutInfo = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="about-info">
      <ContentTemplate data={data} sectionButtonText="Learn More">
        {items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No additional information available.</p>
        )}
      </ContentTemplate>
    </Section>
  );
};

AboutInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutInfo;
