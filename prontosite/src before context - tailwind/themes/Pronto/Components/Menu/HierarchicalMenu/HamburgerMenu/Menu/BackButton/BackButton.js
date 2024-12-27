// BackButton.js
import React from "react";
import ArrowIcon from "../../../../ArrowIcon/ArrowIcon";
import "./back-button.css";

const BackButton = ({ handleBackClick }) => (
  <li className="menu-back">
    <button className="back-button" onClick={handleBackClick}>
    Back <ArrowIcon direction="left" size={16} /> 
    </button>
  </li>
);

export default BackButton;
