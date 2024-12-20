// Testimonials.js
import React from "react";
import ContentTemplate from "../../ContentTemplate";
import CarouselTestimonials from "./Carousel/CarouselTestimonials";
import StaticTestimonials from "./NonCarousel/StaticTestimonials";

const Testimonials = ({ data }) => {
  if (!data?.items) return null;

  return (
    <ContentTemplate data={data} sectionButtonText="View Testimonials">
      {data.items.length > 1 ? (
        <CarouselTestimonials items={data.items} />
      ) : (
        <StaticTestimonials items={data.items} />
      )}
    </ContentTemplate>
  );
};

export default Testimonials;
