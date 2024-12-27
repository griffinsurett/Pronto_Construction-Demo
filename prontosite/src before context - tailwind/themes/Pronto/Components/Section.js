// Components/Section/Section.js
import React from "react";
import PropTypes from "prop-types";
// import "./section.css"; // Create corresponding CSS for Section

const Section = ({
  className = "",
  id = "",
  style = {},
  children,
  ...restProps
}) => {
  return (
    <section className={`section-wrapper ${className}`} id={id} style={style} {...restProps}>
      {children}
    </section>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Section;
