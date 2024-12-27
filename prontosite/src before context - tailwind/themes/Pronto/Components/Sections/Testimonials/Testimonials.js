// Testimonials/Testimonials.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import CarouselTestimonials from "./Carousel/CarouselTestimonials";
import StaticTestimonials from "./NonCarousel/StaticTestimonials";
import { getItemData } from "../../../GetItems"; // NEW import
import PropTypes from "prop-types";

const Testimonials = ({ data }) => {
  const items = getItemData(data);

  if (!items.length) {
    return null; // or some fallback UI
  }

  return (
    <Section className="testimonials-section" id="testimonials">
      <ContentTemplate data={data} sectionButtonText="View Testimonials">
        {items.length > 1 ? (
          <CarouselTestimonials items={items} />
        ) : (
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
