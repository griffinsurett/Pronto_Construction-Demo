// Theme/Components/Sections/Hero2.js
import React from "react";
import ContentTemplate from "../../ContentTemplate";

const GenericHero = ({ title, description }) => {
  if (!title || !description) {
    console.warn("GenericHero: Missing title or description");
  }

  return (
    <ContentTemplate
      title={title}
      className="generic-hero"
      sectionButtonText="Learn More"
    >
      <p>{description}</p>
    </ContentTemplate>
  );
};

export default GenericHero;
