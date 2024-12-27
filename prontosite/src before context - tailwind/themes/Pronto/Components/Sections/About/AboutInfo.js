// About/AboutInfo.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import PropTypes from "prop-types";

const AboutInfo = ({ data }) => {
  if (!data?.items) return null;

  return (
    <Section className="about-info-section" id="about-info">
      <ContentTemplate data={data} sectionButtonText="Learn More">
        <ul>
          {data.items.map((item, index) => (
            <li key={index}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </ContentTemplate>
    </Section>
  );
};

AboutInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutInfo;
