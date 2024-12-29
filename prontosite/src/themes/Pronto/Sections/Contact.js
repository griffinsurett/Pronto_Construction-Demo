// Contact.js
import React from "react";
import Section from "../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../Components/ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Contact = ({ data }) => {

  return (
    <Section id="contact">
      <ContentTemplate data={data} sectionButtonText="Contact Us">
        <div className="flex flex-col md:flex-row">
          {data.contactInfo.map((info, index) => (
            <div key={index} className="flex">
              {/* Validate the icon before rendering */}
              {info.icon && (
                <FontAwesomeIcon icon={info.icon} className="w-6 h-6" />
              )}
              <a href={info.href || "#"} className="hover:underline">
                {info.value || "N/A"}
              </a>
            </div>
          ))}
        </div>
      </ContentTemplate>
    </Section>
  );
};

Contact.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Contact;
