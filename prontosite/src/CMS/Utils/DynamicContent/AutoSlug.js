/**
 * AutoSlug.js
 * Utility to generate automatic slugs for collections and items.
 * Automatically prefixes item slugs with their parent collection name unless `includeCollectionSlug` is explicitly set to `false`.
 */

const generateSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

const autoSlug = (collections) => {
  collections.forEach((collection) => {
    // Generate a slug for the collection if it doesn't already have one
    if (!collection.slug) {
      collection.slug = `/${generateSlug(collection.title || collection.heading)}`;
    }

    // If no items object or no data, skip
    if (!collection.items || !Array.isArray(collection.items.data)) {
      return;
    }

    // Default `includeCollectionSlug` to true if missing
    const includeCollectionSlug =
      collection.items.includeCollectionSlug ?? true;

    // Process items for collections
    collection.items.data.forEach((item) => {
      const itemSlug = generateSlug(item.title || item.name);

      if (!item.slug) {
        // Generate slug based on `includeCollectionSlug`
        item.slug = includeCollectionSlug
          ? `${collection.slug.replace(/\/$/, "")}/${itemSlug}`
          : `/${itemSlug}`;

        // Add redirect for the alternate slug
        item.redirectFrom = item.redirectFrom || [];
        item.redirectFrom.push(
          includeCollectionSlug ? `/${itemSlug}` : `${collection.slug.replace(/\/$/, "")}/${itemSlug}`
        );
      } else {
        // If the item has a manual slug, we still unify it
        const manualSlug = item.slug.replace(/^\//, "");
        if (!item.slug.startsWith(collection.slug)) {
          item.slug = includeCollectionSlug
            ? `${collection.slug.replace(/\/$/, "")}/${manualSlug}`
            : `/${manualSlug}`;

          item.redirectFrom = item.redirectFrom || [];
          item.redirectFrom.push(
            includeCollectionSlug
              ? `/${manualSlug}`
              : `${collection.slug.replace(/\/$/, "")}/${manualSlug}`
          );
        }
      }
    });
  });

  return collections; // Return updated collections
};

export default autoSlug;
