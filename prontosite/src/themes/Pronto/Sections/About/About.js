import React from "react";
import Section from "../../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../../Components/ContentTemplate";
import { getItemData } from "../../GetItems"; // Import getItemData
import PropTypes from "prop-types";

const About = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="about">
      <ContentTemplate 
      data={data}
      sectionButtonText="Learn More About Us" 
      >
        <ul>
          {items.map((info, index) => (
            <li key={index}>
              {info.heading && <h3>{info.heading}</h3>}
              <h4>{info.title}</h4>
              <p>{info.description}</p>
            </li>
          ))}
        </ul>
      </ContentTemplate>
    </Section>
  );
};

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;
