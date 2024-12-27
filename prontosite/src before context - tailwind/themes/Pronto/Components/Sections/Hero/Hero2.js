// Hero/Hero2.js (GenericHero)
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import PropTypes from "prop-types";

const GenericHero = ({ title, description }) => {
  if (!title || !description) {
    console.warn("GenericHero: Missing title or description");
  }

  return (
    <Section className="generic-hero-section" id="generic-hero">
      <ContentTemplate
        title={title}
        className="generic-hero"
        sectionButtonText="Learn More"
      >
        <p>{description}</p>
      </ContentTemplate>
    </Section>
  );
};

GenericHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default GenericHero;
