import React from "react";
import ContentTemplate from "../../ContentTemplate"

const AboutPurpose = ({ data }) => {
  if (!data?.items) return null;

  return (
    <ContentTemplate data={data}>
      {data.items.map((purpose, index) => (
        <div key={index}>
          <h3>{purpose.title}</h3>
          <p>{purpose.description}</p>
        </div>
      ))}
    </ContentTemplate>
  );
};

export default AboutPurpose;
