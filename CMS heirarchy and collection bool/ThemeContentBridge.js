// ThemeContentBridge.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageStructure } from "./Utils/DynamicContent/GetPageStructure";
import { getSiteSettings } from "./Utils/GetContent/GetSettings";
import { setMetaInfo } from "./Utils/SEO/SetMetaInfo";
import Content from "./Content"; // Access menus directly

const useThemeContent = (pageId) => {
  const location = useLocation();
  const [content, setContent] = useState({
    pageStructure: null,
    siteSettings: null,
    loading: true,
  });

  useEffect(() => {
    const fetchContent = () => {
      const pageStructure = getPageStructure(pageId);
      const siteSettings = { ...getSiteSettings(), queries: Content.queries }; // Add menus

      if (pageStructure && siteSettings) {
        // Merge keywords from pageStructure and siteSettings
        const keywords = [
          ...(pageStructure.keywords || []),
          ...(siteSettings.keywords || []),
        ];

        // Dynamically set meta information
        setMetaInfo({
          title: pageStructure.title,
          description: pageStructure.description,
          keywords, // Pass the array
          siteTitle: siteSettings.siteTitle,
          author: siteSettings.businessOwner,
          image: pageStructure.featuredImage || siteSettings.siteLogo, // Include featuredImage
        });
      }

      setContent({
        pageStructure,
        siteSettings,
        loading: false,
      });
    };

    setContent({ pageStructure: null, siteSettings: null, loading: true });
    fetchContent();
  }, [location, pageId]);

  return content;
};

export default useThemeContent;
