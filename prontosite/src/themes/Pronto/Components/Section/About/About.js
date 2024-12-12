import React from "react";
import ContentTemplate from "../../ContentTemplate";

const AboutSection = ({ data }) => {
  if (!data) {
    console.error("AboutSection: Missing data");
    return null;
  }

  const { aboutInfo, aboutHeading } = data;

  return (
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
  );
};

export default AboutSection;
