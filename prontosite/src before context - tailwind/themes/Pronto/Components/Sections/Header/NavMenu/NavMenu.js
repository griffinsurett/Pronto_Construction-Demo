import React from "react";
import HierarchicalMenu from "../../Menu/HierarchicalMenu/HierarchicalMenu";

const NavMenu = ({ menuManager }) => {
  const navMenuItems = menuManager?.getHierarchicalMenu("Primary") || [];
  return (
    <HierarchicalMenu
      menuItems={navMenuItems}
      hamburgerOnly={false}
      breakpoint={1068} 
    />
  );
};

export default NavMenu;