// CMS/Utils/PickTheme.js
import React from "react";
// import CMSDisplayTheme from "../themes/CMSDisplayTheme/CMSDisplayTheme";
import Pronto from "./themes/Pronto/CMSDisplayTheme";

// Dynamic Theme Loader Component
const DynamicThemeLoader = ({ pageId }) => {
  // Logic for selecting a theme could be added here if needed
  return <Pronto pageId={pageId} />;
  // return <CMSDisplayTheme pageId={pageId} />;
};

export default DynamicThemeLoader;
