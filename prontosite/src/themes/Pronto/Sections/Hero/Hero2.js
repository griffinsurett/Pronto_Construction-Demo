// Hero/Hero2.js (GenericHero)
import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import PropTypes from "prop-types";

const GenericHero = ({ title, description }) => {

  return (
    <Section id="generic-hero">
      <ContentTemplate
        title={title}
        sectionButtonText="Learn More"
        paragraphs={[description]}
     />
    </Section>
  );
};

GenericHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default GenericHero;
