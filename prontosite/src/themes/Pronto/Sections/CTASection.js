import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import { getItemData } from "../../GetItems"; // Import getItemData
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CTASection = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="cta">
      <ContentTemplate data={data} sectionButtonText="Get Started">
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </ContentTemplate>
    </Section>
  );
};

CTASection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CTASection;
