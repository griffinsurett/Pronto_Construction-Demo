// About/WhyChooseUs.js
import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getItemData } from "../../GetItems"; // NEW import
import PropTypes from "prop-types";

const WhyChooseUs = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="why-choose-us">
      <ContentTemplate data={data} sectionButtonText="Learn More">
        <ul>
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              {item.icon && (
                <FontAwesomeIcon icon={item.icon}/>
              )}
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
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
