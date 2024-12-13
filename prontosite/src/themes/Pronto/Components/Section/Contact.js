// Theme/Components/Sections/Contact.js
// Contact.js
import React from "react";
import ContentTemplate from "../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = ({ data }) => {
  if (!data) return <p>No Contact section data available.</p>;

  return (
    <ContentTemplate data={data} sectionButtonText="Contact Us">
      <div className="contact-info">
        {data.contactInfo.map((info, i) => (
          <div key={i} className="contact-item">
            <FontAwesomeIcon icon={info.icon} />
            <a href={info.href}>{info.value}</a>
          </div>
        ))}
      </div>
      {/* <form>
        {data.formFields.map((field, i) => (
          <input
            key={i}
            type="text"
            name={field.name}
            placeholder={field.placeholder}
          />
        ))}
        <button type="submit">{data.button.text}</button>
      </form> */}
    </ContentTemplate>
  );
};

export default Contact;