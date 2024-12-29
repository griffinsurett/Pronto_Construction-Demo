// MenuList.js
import React from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ items }) => (
  <>
    {items.map((item, index) => (
      <MenuItem key={index} item={item} />
    ))}
  </>
);

export default MenuList;
