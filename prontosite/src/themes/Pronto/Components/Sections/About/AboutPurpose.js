// About/AboutPurpose.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import PropTypes from "prop-types";

const AboutPurpose = ({ data }) => {
  if (!data?.items) return null;

  return (
    <Section className="about-purpose-section" id="about-purpose">
      <ContentTemplate data={data}>
        {data.items.map((purpose, index) => (
          <div key={index}>
            <h3>{purpose.title}</h3>
            <p>{purpose.description}</p>
          </div>
        ))}
      </ContentTemplate>
    </Section>
  );
};

AboutPurpose.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPurpose;
