// Theme/Components/Sections/FAQ.js
// FAQ.js
import React, { useState } from "react";
import ContentTemplate from "../ContentTemplate";

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data) return <p>No FAQ section data available.</p>;

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ContentTemplate data={data} className="faq-section">
      <div className="faq-list">
        {data.items.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              onClick={() => toggleFAQ(index)}
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
            >
              {item.question}
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </ContentTemplate>
  );
};

export default FAQ;