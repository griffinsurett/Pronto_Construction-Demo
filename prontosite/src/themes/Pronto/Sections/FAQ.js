// FAQ.js
import React, { useState } from "react";
import Section from "../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../Components/ContentTemplate";
import { getItemData } from "../GetItems"; // NEW import
import PropTypes from "prop-types";

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Use getItemData to unify item retrieval
  const items = getItemData(data);
  
  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <Section id="faq">
      <ContentTemplate data={data} sectionButtonText="View FAQ">
        <div>
          {items.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.title || "Untitled Question"}</span>
                <svg
                  className={`w-5 h-5 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div>
                  <p>{item.description || "No answer available."}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ContentTemplate>
    </Section>
  );
};

FAQ.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FAQ;
