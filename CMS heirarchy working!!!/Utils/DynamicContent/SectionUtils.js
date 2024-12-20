// Utils/SectionUtils.js
export const shouldShowSectionLink = (sectionSlug, currentSlug) => {
  return sectionSlug && sectionSlug !== currentSlug;
};
