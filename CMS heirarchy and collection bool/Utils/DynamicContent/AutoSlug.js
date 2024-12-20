/**
 * AutoSlug.js
 * Utility to generate automatic slugs for collections and items.
 * Automatically prefixes item slugs with their parent collection name unless `includeCollectionSlug` is explicitly set to `false`.
 */
const generateSlug = (title) => {
  if (!title) return ""; // Handle cases where no title is provided
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

const autoSlug = (collections) => {
  collections.forEach((collection) => {
    // Default `includeCollectionSlug` to true
    const includeCollectionSlug = collection.includeCollectionSlug ?? true;

    // Generate a slug for the collection if it doesn't already have one
    if (!collection.slug) {
      collection.slug = `/${generateSlug(collection.title || collection.heading)}`;
    }

    // Process items for collections
    if (Array.isArray(collection.items)) {
      const parentSlug = collection.slug ? collection.slug.replace(/\/$/, "") : "";

      collection.items.forEach((item) => {
        const itemSlug = generateSlug(item.title || item.name);

        if (!item.slug) {
          // Generate slug based on `includeCollectionSlug`
          item.slug = includeCollectionSlug
            ? `${parentSlug}/${itemSlug}`
            : `/${itemSlug}`;

          // Add redirect for the alternate slug
          item.redirectFrom = item.redirectFrom || [];
          item.redirectFrom.push(
            includeCollectionSlug ? `/${itemSlug}` : `${parentSlug}/${itemSlug}`
          );
        } else if (!item.slug.startsWith(parentSlug)) {
          // Respect manually set slugs and normalize them
          const manualSlug = item.slug.replace(/^\//, "");
          item.slug = includeCollectionSlug
            ? `${parentSlug}/${manualSlug}`
            : `/${manualSlug}`;

          // Add redirect for the alternate slug
          item.redirectFrom = item.redirectFrom || [];
          item.redirectFrom.push(
            includeCollectionSlug ? `/${manualSlug}` : `${parentSlug}/${manualSlug}`
          );
        }
      });
    }
  });

  return collections; // Return updated collections
};

export default autoSlug;
