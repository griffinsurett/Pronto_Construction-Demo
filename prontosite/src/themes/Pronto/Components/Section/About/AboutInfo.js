import React from "react";
import ContentTemplate from "../../ContentTemplate";

const AboutInfo = ({ data }) => {
  if (!data?.items) return null;

  return (
    <ContentTemplate data={data} sectionButtonText="Learn More">
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </ContentTemplate>
  );
};

export default AboutInfo;