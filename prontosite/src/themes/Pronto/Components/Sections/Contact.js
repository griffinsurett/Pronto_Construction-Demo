// Contact.js
import React from "react";
import Section from "../Section"; // Adjust the import path as necessary
import ContentTemplate from "../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Contact = ({ data }) => {
  if (!data || !data.contactInfo) {
    console.error("Contact: Missing or invalid data");
    return <p>No contact information available.</p>;
  }

  return (
    <Section className="contact-section" id="contact">
      <ContentTemplate data={data} sectionButtonText="Contact Us">
        <div className="contact-info">
          {data.contactInfo.map((info, index) => (
            <div key={index} className="contact-item">
              {/* Validate the icon before rendering */}
              {info.icon && <FontAwesomeIcon icon={info.icon} />}
              <a href={info.href || "#"}>{info.value || "N/A"}</a>
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
