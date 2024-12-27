// About/WhyChooseUs.js
import React from "react";
import Section from "../../Section"; // Adjust the import path as necessary
import ContentTemplate from "../../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getItemData } from "../../../GetItems"; // NEW import
import PropTypes from "prop-types";

const WhyChooseUs = ({ data }) => {
  const items = getItemData(data);

  if (!items.length) {
    console.warn("WhyChooseUs: No data items provided.");
    return <p>Why Choose Us section data is missing.</p>;
  }

  return (
    <Section className="why-choose-us-section" id="why-choose-us">
      <ContentTemplate data={data} sectionButtonText="Learn More">
        <h2>{data?.title || "Why Choose Us"}</h2>
        {data?.heading && <h3>{data.heading}</h3>}
        <ul className="why-choose-us-list">
          {items.map((item, index) => (
            <li key={index} className="why-choose-us-item">
              {item.icon && <FontAwesomeIcon icon={item.icon} className="icon" />}
              <h3>{item.title || "Untitled Benefit"}</h3>
              <p>{item.description || "No description provided."}</p>
            </li>
          ))}
        </ul>
      </ContentTemplate>
    </Section>
  );
};

WhyChooseUs.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WhyChooseUs;
