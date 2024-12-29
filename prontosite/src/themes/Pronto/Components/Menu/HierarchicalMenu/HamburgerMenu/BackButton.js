// BackButton.js
import React from "react";
import ArrowIcon from "../../ArrowIcon";

const BackButton = ({ handleBackClick }) => (
  <li className="w-full">
    <button
      className="flex items-center px-4 py-2 text-gray-800 hover:underline focus:outline-none"
      onClick={handleBackClick}
    >
      <ArrowIcon direction="left" size={16} />
      <span className="ml-2">Back</span>
    </button>
  </li>
);

export default BackButton;
