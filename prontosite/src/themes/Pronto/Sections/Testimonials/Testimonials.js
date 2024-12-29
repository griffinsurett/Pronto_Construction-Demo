// Testimonials/Testimonials.js
import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import CarouselTestimonials from "./CarouselTestimonials";
import StaticTestimonials from "./StaticTestimonials";
import { getItemData } from "../../GetItems"; // NEW import
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Testimonials = ({ data }) => {
  const items = getItemData(data);
  const location = useLocation();

  // Check if the current path is the `/testimonials` collection page.
  const isTestimonialsPage = location.pathname === "/testimonials";

  return (
    <Section id="testimonials">
      <ContentTemplate data={data} sectionButtonText="View Testimonials">
        {isTestimonialsPage ? (
          // Render StaticTestimonials on the /testimonials page.
          <StaticTestimonials items={items} />
        ) : items.length > 1 ? (
          // Render CarouselTestimonials if there are multiple testimonials.
          <CarouselTestimonials items={items} />
        ) : (
          // Render StaticTestimonials for single testimonials elsewhere.
          <StaticTestimonials items={items} />
        )}
      </ContentTemplate>
    </Section>
  );
};

Testimonials.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Testimonials;
