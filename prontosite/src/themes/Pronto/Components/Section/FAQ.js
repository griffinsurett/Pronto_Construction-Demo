// FAQ.js
import React, { useState } from "react";
import ContentTemplate from "../ContentTemplate";
import { getItemData } from "../../GetItems"; // NEW import

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Use getItemData to unify item retrieval
  const items = getItemData(data);

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
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
            >
              {item.title || "Untitled Question"}
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.description || "No answer available."}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </ContentTemplate>
  );
};

export default FAQ;
