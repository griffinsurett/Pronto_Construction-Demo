// Hero/HomeHero.js
import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HomeHero = ({ data }) => {
  return (
    <Section id="home-hero">
      <ContentTemplate
        title={data.siteTitle}
        heading={data.siteTagline}
        ifHero={true}
        paragraphs={[data.siteDescription]}
        sectionButtonText="Get a Quote"
      >
        {/* CTA Button */}
        {data.CTALink && data.CTAButton && (
          <div>
            <Link to={data.CTALink} className="hover:underline">
              {data.CTAButton}
            </Link>
          </div>
        )}
      </ContentTemplate>
    </Section>
  );
};

HomeHero.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HomeHero;
