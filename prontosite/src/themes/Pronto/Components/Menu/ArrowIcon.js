// ArrowIcon.js
import React from "react";

const ArrowIcon = ({ direction = "down", size = 16 }) => {
  const rotationMap = {
    down: "rotate-0",
    up: "rotate-180",
    right: "rotate-90",
    left: "-rotate-90",
  };

  const rotationClass = rotationMap[direction] || "rotate-0";

  return (
    <svg
      className={`inline-block transition-transform duration-300 ${rotationClass}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default ArrowIcon;
