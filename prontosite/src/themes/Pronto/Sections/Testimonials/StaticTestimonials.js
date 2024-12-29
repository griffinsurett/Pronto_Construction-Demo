// StaticTestimonials.js
import React from "react";

const StaticTestimonials = ({ items }) => {
  return (
    <div>
      {items.map((testimonial, index) => (
        <div key={index}>
          <blockquote className="italic">"{testimonial.quote}"</blockquote>
          <p>
            <strong>{testimonial.name}</strong>, {testimonial.position}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StaticTestimonials;
;
