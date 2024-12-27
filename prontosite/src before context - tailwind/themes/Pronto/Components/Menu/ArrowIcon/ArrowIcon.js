// HierarchicalMenu/ArrowIcon.js
import React from "react";
import "./arrow-icon.css";

const ArrowIcon = ({ direction = "down", size = 16 }) => {
  const rotationMap = {
    down: "rotate(0deg)",
    up: "rotate(180deg)",
    right: "rotate(90deg)",
    left: "rotate(-90deg)",
  };

  const style = {
    transform: rotationMap[direction],
    width: `${size}px`,
    height: `${size}px`,
  };

  return <span className="arrow-icon" style={style}>▼</span>;
};

export default ArrowIcon;
