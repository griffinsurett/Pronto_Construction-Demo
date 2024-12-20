import React from "react";
import ContentTemplate from "../../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Benefits = ({ data }) => {
  if (!data?.items) return null;

  return (
    <ContentTemplate data={data} sectionButtonText="View All Benefits">
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>
            {item.icon && <FontAwesomeIcon icon={item.icon} />}
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </ContentTemplate>
  );
};

export default Benefits;
