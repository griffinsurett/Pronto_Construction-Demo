// Contact.js
import React from "react";
import ContentTemplate from "../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = ({ data }) => {
  if (!data || !data.contactInfo) {
    console.error("Contact: Missing or invalid data");
    return <p>No contact information available.</p>;
  }

  return (
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
  );
};

export default Contact;
