// CMS/Utils/GetSiteSettings.js
import Content from "../../Content"; // Adjust the path as necessary

export const getSiteSettings = () => {
  // Ensure Content exists and contains siteSettings
  if (!Content || !Content.siteSettings) {
    console.error("Error: Site settings not found in Content.");
    return null;
  }

  return Content.siteSettings;
};
