import React from "react";

const AboutInfo = ({ data }) => {
  // Ensure `data.items` is an array
  if (!data || !Array.isArray(data.items)) {
    console.error("AboutInfo: Missing or invalid data.items.");
    return <p>No additional information available.</p>;
  }

  return (
    <section className="about-info">
      {data.title && <h2>{data.title}</h2>}
      {data.heading && <h3>{data.heading}</h3>}
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>
            <h4>{item.title}</h4>
            {item.heading && <h5>{item.heading}</h5>}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutInfo;
