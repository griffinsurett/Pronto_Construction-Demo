/**
 * StaticPageUtils.js
 * Processes static pages like error, cookie policy, and privacy policy.
 */

export const processStaticPages = (pages) => {
    return pages.map((page) => ({
      ...page,
      sections: page.sections || [], // Ensure sections exist (default empty)
    }));
  };
  