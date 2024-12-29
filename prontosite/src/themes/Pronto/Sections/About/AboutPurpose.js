import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import { getItemData } from "../../GetItems"; // Import getItemData
import PropTypes from "prop-types";

const AboutPurpose = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="about-purpose">
      <ContentTemplate data={data}>
        <ul>
          {items.map((purpose, index) => (
            <li key={index}>
              <h3>{purpose.title}</h3>
              <p>{purpose.description}</p>
            </li>
          ))}
        </ul>
      </ContentTemplate>
    </Section>
  );
};

AboutPurpose.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPurpose;
