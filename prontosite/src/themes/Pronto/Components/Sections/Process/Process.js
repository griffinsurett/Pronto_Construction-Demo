// Process/Process.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import { getItemData } from "../../../GetItems"; // NEW import
import PropTypes from "prop-types";

const ProcessSection = ({ data }) => {
  const items = getItemData(data);

  if (!items.length) {
    console.error("ProcessSection: Missing or invalid data format.", data);
    return null;
  }

  return (
    <Section className="process-section" id="process">
      <ContentTemplate data={data} sectionButtonText="Learn About Our Process">
        <h2>{data.heading || data.title || "Our Process"}</h2>
        <p>{data.paragraph || "Learn how we deliver results."}</p>
        <ol className="process-steps">
          {items.map((step, index) => (
            <li key={index} className="process-step">
              <h3>{step.name}</h3>
              <p>{step.description}</p>
              {step.featuredImage && (
                <img src={step.featuredImage} alt={step.name} />
              )}
            </li>
          ))}
        </ol>
      </ContentTemplate>
    </Section>
  );
};

ProcessSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProcessSection;
