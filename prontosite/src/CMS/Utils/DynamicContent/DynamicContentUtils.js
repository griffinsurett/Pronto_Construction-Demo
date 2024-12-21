// Utils/DynamicContent/DynamicContentUtils.js
import autoSlug from "./AutoSlug";

const processDynamicContent = ({ pages, collections }) => {
  // Apply autoSlug to collections
  const processedCollections = autoSlug(collections);

  // Copy pages for further processing
  const processedPages = [...pages];

  // Process collections to add dynamic pages
  processedCollections.forEach((collection) => {
    if (collection.hasPage) {
      processedPages.push({
        id: collection.collection,
        sections: collection.sections,
        slug: collection.slug,
        isCollection: true,
      });
    }

    // If we have item-level pages
  // If we have item-level pages
// If we have item-level pages:
if (
  collection.items &&
  collection.items.itemsHasPage &&
  Array.isArray(collection.items.data)
) {
  collection.items.data.forEach((item) => {
    // 1) If `onlyParentItemsHasPage` is TRUE, skip children
    const skipChildPage =
      collection.items.onlyParentItemsHasPage === true && item.parentItem;

    // 2) If not skipping, generate a page
    if (!skipChildPage && item.slug) {
      processedPages.push({
        id: item.slug,
        sections: item.sections || collection.items.itemSections,
        slug: item.slug,
        isCollection: true,
      });
      // Mark the item as having a page
      item.hasPage = true;
    } else {
      // Otherwise, no page
      item.hasPage = false;
    }
  });
}
  });

  return { processedCollections, processedPages };
};

export default processDynamicContent;
