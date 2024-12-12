import React from "react";

const AboutPurpose = ({ title, data }) => {
  if (!data || !Array.isArray(data.items)) {
    console.error("AboutPurpose: Missing or invalid data structure");
    return <p>No purpose information available.</p>;
  }

  return (
    <section className="about-purpose">
      {title && <h2>{data.title}</h2>}
      <h3>{data.heading}</h3>
      <p>{data.description}</p>
      <ul>
        {data.items.map((purpose, index) => (
          <li key={index}>
            <h4>{purpose.title}</h4>
            <p>{purpose.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutPurpose;
