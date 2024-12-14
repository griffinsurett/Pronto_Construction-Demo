/**
 * HomepageUtils.js
 * Handles homepage generation and integration logic.
 */
import { processStaticPages } from "./StaticPageUtils";

/**
 * Processes pages and applies a homepage override if defined.
 * @param {Array} defaultPages - Array of default pages to process.
 * @param {Object|null} homepageOverride - Optional homepage override object.
 * @returns {Array} - Array of processed pages including the homepage.
 */
export const processHomepage = (defaultPages, homepageOverride = null) => {
  const staticPages = processStaticPages(defaultPages);

  const defaultHomepage = staticPages.find((page) => page.id === "home");

  if (!defaultHomepage) {
    console.warn("Default homepage not found in static pages.");
    return staticPages;
  }

  const homepage = {
    ...defaultHomepage,
    sections: homepageOverride?.sections || defaultHomepage.sections || [],
    title: homepageOverride?.title || defaultHomepage.title,
    description: homepageOverride?.description || defaultHomepage.description,
    featuredImage: homepageOverride?.featuredImage || defaultHomepage.featuredImage, // Preserve featured image
  };

  return [
    ...staticPages.filter((page) => page.id !== "home"),
    homepage,
  ];
};

