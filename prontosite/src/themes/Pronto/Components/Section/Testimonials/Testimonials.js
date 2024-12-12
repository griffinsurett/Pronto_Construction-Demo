import React from "react";
import { useLocation } from "react-router-dom";
import ContentTemplate from "../../ContentTemplate";
import CarouselTestimonials from "./Carousel/CarouselTestimonials";
import StaticTestimonials from "./NonCarousel/StaticTestimonials";
import "./testimonials.css";

const Testimonials = ({ data }) => {
  const location = useLocation();

  // Check if the current page is the testimonials collection page
  const isCollectionPage = location.pathname === data.slug;

  // Check if there are multiple testimonials
  const hasMultipleTestimonials = data.items && data.items.length > 1;

  return (
    <ContentTemplate data={data} sectionButtonText="View All Testimonials">
      {isCollectionPage ? (
        <StaticTestimonials items={data.items} />
      ) : hasMultipleTestimonials ? (
        <CarouselTestimonials items={data.items} />
      ) : (
        // Show the single testimonial in a static format
        <StaticTestimonials items={data.items} />
      )}
    </ContentTemplate>
  );
};

export default Testimonials;
