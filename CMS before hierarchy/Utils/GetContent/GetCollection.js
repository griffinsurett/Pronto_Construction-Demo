// CMS/Utils/GetCollection.js
import Content from "../../Content";

/**
 * Retrieves a collection by its slug or an item within the collection by its slug.
 * Optionally filters related items based on `pageId`.
 * @param {string} slug - The slug to search for.
 * @param {string} [pageId] - The page ID for filtering related items.
 * @returns {object|null} - The matching collection or null if not found.
 */
export const getCollection = (slug, pageId = null) => {
  const collection =
    Content.collections.find((c) => c.collection === slug) ||
    Content.collections.find((c) =>
      c.items?.some((item) => item.slug === slug)
    );

  if (!collection) {
    // console.error(`Collection or item with slug '${slug}' not found.`);
    return null;
  }

  // If `pageId` is "home", return the entire collection
  if (pageId === "home") {
    return collection;
  }

  // If filtering for a specific page, return only related items
  if (pageId && collection.items) {
    const relatedItems = collection.items.filter((item) => {
      return (
        item.relatedToServices?.includes(pageId) ||
        item.relatedToProjects?.includes(pageId) ||
        item.relatedToTestimonials?.includes(pageId)
      );
    });

    return { ...collection, items: relatedItems };
  }

  return collection; // Return the unfiltered collection
};
