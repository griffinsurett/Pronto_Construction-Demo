// Import autoSlug utility
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

    if (collection.itemsHasPage && Array.isArray(collection.items)) {
      collection.items.forEach((item) => {
        if (item.slug) {
          processedPages.push({
            id: item.slug,
            sections: item.sections || collection.itemSections,
            slug: item.slug,
            isCollection: true,
          });
        }
      });
    }
  });

  return { processedCollections, processedPages };
};

export default processDynamicContent;
