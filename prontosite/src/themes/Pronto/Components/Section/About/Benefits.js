import React from "react";
import ContentTemplate from "../../ContentTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getItemData } from "../../../GetItems"; // NEW import

const Benefits = ({ data }) => {
  const items = getItemData(data);

  if (!items.length) {
    return null;
  }

  return (
    <ContentTemplate data={data} sectionButtonText="View All Benefits">
      <ul>
        {items.map((item, index) => (
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
