// Testimonials.js
import React from "react";
import ContentTemplate from "../../ContentTemplate";
import CarouselTestimonials from "./Carousel/CarouselTestimonials";
import StaticTestimonials from "./NonCarousel/StaticTestimonials";
import { getItemData } from "../../../GetItems"; // NEW import

const Testimonials = ({ data }) => {
  const items = getItemData(data);

  if (!items.length) {
    return null; // or some fallback UI
  }

  return (
    <ContentTemplate data={data} sectionButtonText="View Testimonials">
      {items.length > 1 ? (
        <CarouselTestimonials items={items} />
      ) : (
        <StaticTestimonials items={items} />
      )}
    </ContentTemplate>
  );
};

export default Testimonials;
