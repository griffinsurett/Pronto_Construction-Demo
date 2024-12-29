// Process/Process.js
import React from "react";
import Section from "../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../Components/ContentTemplate";
import { getItemData } from "../GetItems"; // NEW import
import PropTypes from "prop-types";

const ProcessSection = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="process">
      <ContentTemplate data={data} sectionButtonText="Learn About Our Process">
        <ol>
          {items.map((step, index) => (
            <li key={index}>
              <h3>{step.name}</h3>
              <p>{step.description}</p>
              {step.featuredImage && (
                <img
                  src={step.featuredImage}
                  alt={step.name}
                  width={50}
                />
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
