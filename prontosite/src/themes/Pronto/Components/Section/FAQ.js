// FAQ.js
import React, { useState } from "react";
import ContentTemplate from "../ContentTemplate";

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const items = data?.items || []; // Validate data.items
  
  if (!items.length) {
    console.warn("FAQ: No questions available.");
    return <p>No FAQ data available.</p>;
  }

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ContentTemplate data={data} className="faq-section">
      <div className="faq-list">
        {items.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              onClick={() => toggleFAQ(index)}
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
            >
              {item.question || "Untitled Question"}
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer || "No answer available."}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </ContentTemplate>
  );
};

export default FAQ;
