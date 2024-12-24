import React from "react";
import Carousel from "../../../../../../components/Carousel/Carousel";
import "./carousel-testimonials.css";

const CarouselTestimonials = ({ items }) => {
    // console.log("CarouselTestimonials items:", items); // Debug log
  
    const testimonialSlides = items.map((testimonial, index) => (
      <div key={index} className="carousel-slide">
        <blockquote>{`"${testimonial.quote}"`}</blockquote>
        <p className="carousel-author">{testimonial.name}</p>
        <p className="carousel-position">{testimonial.position}</p>
      </div>
    ));
  
    return (
      <div className="carousel-testimonials">
        <Carousel slides={testimonialSlides} />
      </div>
    );
  };  

export default CarouselTestimonials;
