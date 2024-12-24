// ContentTemplate.js
import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const ContentTemplate = ({
  data = {}, // Data object for default values
  title = data.title,
  heading = data.heading,
  paragraphs = data.paragraphs || [],
  showParagraphs = true,
  sectionSlug = data.slug,
  hasPage = data.hasPage, // Automatically fetch `hasPage` from `data`
  showSectionButton = true,
  sectionButtonText = "Learn More",
  className = "",
  children,
}) => {
  const location = useLocation();
  const currentSlug = location.pathname;

  // Determine whether to display the section button
  const displaySectionButton =
    showSectionButton && // Button display is allowed
    hasPage && // Section must have a page
    sectionSlug && // Section slug must exist
    sectionSlug !== currentSlug; // Avoid showing button for the current page

  return (
    <section className={`content-template ${className}`}>
      
      
      {/* Title */}
      {title && <h5>{title}</h5>}

      {/* Heading */}
      {heading && <h2>{heading}</h2>}

      {/* Paragraphs */}
      {showParagraphs && paragraphs.length > 0 && (
        <div>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {/* Children */}
      {children && <div>{children}</div>}

      {/* Section Button */}
      {displaySectionButton && (
        <div>
          <Link to={sectionSlug}>{sectionButtonText}</Link>
        </div>
      )}
    </section>
  );
};

ContentTemplate.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    heading: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string,
    hasPage: PropTypes.bool, // Ensure hasPage is part of the data object
  }),
  title: PropTypes.string,
  heading: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
  showParagraphs: PropTypes.bool,
  sectionSlug: PropTypes.string,
  hasPage: PropTypes.bool, // Define hasPage as an explicit prop
  showSectionButton: PropTypes.bool,
  sectionButtonText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ContentTemplate;
