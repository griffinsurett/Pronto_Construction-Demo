import React from "react";
import ContentTemplate from "../../ContentTemplate";
import { Link } from "react-router-dom";

const HomeHero = ({ data }) => {
  if (!data || !data.siteTitle || !data.siteDescription) {
    console.error("HomeHero: Missing data for homepage");
    return <p>Something went wrong. Homepage hero data is missing.</p>;
  }

  return (
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
  );
};

export default HomeHero;
