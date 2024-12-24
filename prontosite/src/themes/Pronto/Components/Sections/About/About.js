// About/About.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import PropTypes from "prop-types";

const About = ({ data }) => {
  if (!data) {
    console.error("About: Missing data");
    return null;
  }

  const { aboutInfo, aboutHeading } = data;

  return (
    <Section className="about-section" id="about">
      <ContentTemplate
        data={data}
        sectionButtonText="Learn More About Us"
      >
        {aboutHeading && <h2>{aboutHeading}</h2>}
        {aboutInfo && aboutInfo.length > 0 && (
          <div className="about-info">
            {aboutInfo.map((info, index) => (
              <div key={index}>
                {info.heading && <h3>{info.heading}</h3>}
                <h4>{info.title}</h4>
                <p>{info.description}</p>
              </div>
            ))}
          </div>
        )}
      </ContentTemplate>
    </Section>
  );
};

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;
