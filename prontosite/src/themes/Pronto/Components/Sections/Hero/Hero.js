// Hero/HomeHero.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HomeHero = ({ data }) => {
  if (!data || !data.siteTitle || !data.siteDescription) {
    console.error("HomeHero: Missing data for homepage");
    return <p>Something went wrong. Homepage hero data is missing.</p>;
  }

  return (
    <Section className="home-hero-section" id="home-hero">
      <ContentTemplate title={data.siteTitle} className="home-hero">
        <p>{data.siteDescription}</p>
        {/* CTA Button */}
        {data.CTALink && data.CTAButton && (
          <div className="cta-container">
            <Link to={data.CTALink} className="cta-button">
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
