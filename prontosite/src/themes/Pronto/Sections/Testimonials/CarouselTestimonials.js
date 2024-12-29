// CarouselTestimonials.js
import React from "react";
import Carousel from "../../../../components/Carousel/Carousel";

const CarouselTestimonials = ({ items }) => {
  // console.log("CarouselTestimonials items:", items); // Debug log

  const testimonialSlides = items.map((testimonial, index) => (
    <div key={index}>
      <blockquote className="italic">"{testimonial.quote}"</blockquote>
      <p>{testimonial.name}</p>
      <p>{testimonial.position}</p>
    </div>
  ));

  return (
    <div>
      <Carousel slides={testimonialSlides} />
    </div>
  );
};

export default CarouselTestimonials;
