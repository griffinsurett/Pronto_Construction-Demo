// CTASection/CTASection.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./cta-section.css";

const CTASection = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) {
    console.error("CTASection: No data provided or no items available.");
    return null;
  }

  return (
    <Section className="cta-section" id="cta">
      <ContentTemplate data={data} sectionButtonText="Get Started">
        <div className="cta-container">
          {data.items.map((item, index) => (
            <Link key={index} href={item.link} className="cta-button">
              {item.title}
            </Link>
          ))}
        </div>
      </ContentTemplate>
    </Section>
  );
};

CTASection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CTASection;
