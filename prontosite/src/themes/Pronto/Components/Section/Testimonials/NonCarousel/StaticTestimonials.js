import React from "react";
import "./static-testimonials.css";

const StaticTestimonials = ({ items }) => {
  return (
    <div className="static-testimonials">
      {items.map((testimonial, index) => (
        <div key={index} className="static-testimonial-item">
          <blockquote>{`"${testimonial.quote}"`}</blockquote>
          <p>
            <strong>{testimonial.name}</strong>, {testimonial.position}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StaticTestimonials;
