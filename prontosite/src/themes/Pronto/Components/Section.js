// Section.js
import React from "react";
import PropTypes from "prop-types";

const Section = ({
  className = "h-screen flex flex-col justify-center items-center",
  id = "",
  style = {},
  children,
  ...restProps
}) => {
  return (
    <section
      className={`${className}`}
      id={id}
      style={style}
      {...restProps}
    >
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
