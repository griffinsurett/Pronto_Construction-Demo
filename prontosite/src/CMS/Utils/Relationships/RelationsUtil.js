/* RelationsUtil.js */
export class RelationalUtil {
  constructor(content) {
    this.content = content;
    this.inferIndirectRelationships();
  }

  /**
   * Main entry point to relate two entities by ID, index, or slug.
   * usage: relate("services", 0, "projects", "/kitchen-remodel");
   */
  relate(fromCollection, fromIdentifier, toCollection, toIdentifier) {
    const fromEntity = this.findEntityByIdentifier(fromCollection, fromIdentifier);
    const toEntity = this.findEntityByIdentifier(toCollection, toIdentifier);

    if (!fromEntity || !toEntity) {
      console.error(
        `Failed to create relationship: Invalid entities. 
        fromCollection=${fromCollection} identifier=${fromIdentifier} 
        toCollection=${toCollection} identifier=${toIdentifier}`
      );
      return;
    }

    const fromRelationKey = `relatedTo${this.capitalize(toCollection)}`;
    const toRelationKey   = `relatedTo${this.capitalize(fromCollection)}`;

    fromEntity[fromRelationKey] = fromEntity[fromRelationKey] || [];
    if (!fromEntity[fromRelationKey].includes(toEntity.slug)) {
      fromEntity[fromRelationKey].push(toEntity.slug);
    }

    toEntity[toRelationKey] = toEntity[toRelationKey] || [];
    if (!toEntity[toRelationKey].includes(fromEntity.slug)) {
      toEntity[toRelationKey].push(fromEntity.slug);
    }
  }

  /**
   * Flexible find: handles numeric ID, numeric index, or string-based slug.
   */
  findEntityByIdentifier(collectionName, identifier) {
    const collection = this.content.collections.find(
      (col) => col.collection === collectionName
    );
    if (!collection) {
      console.error(`Collection '${collectionName}' not found.`);
      return null;
    }

    const items = collection.items?.data || collection.items || [];
    if (!Array.isArray(items)) {
      console.error(
        `Collection '${collectionName}' has no 'items.data' array.`
      );
      return null;
    }

    // 1) If number => ID or Index
    if (typeof identifier === "number") {
      // (a) item with item.id === identifier
      let found = items.find((item) => item.id === identifier);
      if (found) return found;

      // (b) item at array index = identifier
      if (identifier >= 0 && identifier < items.length) {
        found = items[identifier];
        if (found) return found;
      }

      console.error(
        `No item in '${collectionName}' for numeric identifier = ${identifier}`
      );
      return null;
    }

    // 2) If string => match by slug
    if (typeof identifier === "string") {
      const cleanedSlug = identifier.replace(/^\//, ""); // remove leading slash
      const found = items.find(
        (item) =>
          item.slug === identifier ||
          item.slug === `/${cleanedSlug}` ||
          item.slug.endsWith(`/${cleanedSlug}`)
      );

      if (!found) {
        console.error(
          `No item found in '${collectionName}' for slug/partial slug = '${identifier}'`
        );
      }
      return found || null;
    }

    // 3) Otherwise unrecognized type
    console.error(
      `Identifier of type '${typeof identifier}' not supported by findEntityByIdentifier.`
    );
    return null;
  }

  /**
   * Overhaul your old "findEntityBySlug" calls to use findEntityByIdentifier.
   * Because we want to unify all lookups here. So let's make a convenience alias:
   */
  // If you want to keep the name for backward compatibility:
  findEntityBySlug(collectionName, maybeSlug) {
    // If it's a number or something else, pass it along. If truly a slug string, also pass it along:
    return this.findEntityByIdentifier(collectionName, maybeSlug);
  }

  /**
   * Get related items from a given entity (found by ID, index, or slug).
   */
  getRelatedItems(collectionName, identifier, targetCollection) {
    const entity = this.findEntityByIdentifier(collectionName, identifier);
    if (!entity) return [];

    const relationKey = `relatedTo${this.capitalize(targetCollection)}`;
    const relatedSlugs = entity[relationKey] || [];

    const targetCol = this.content.collections.find(
      (col) => col.collection === targetCollection
    );
    if (!targetCol || !targetCol.items || !targetCol.items.data) {
      return [];
    }

    return targetCol.items.data.filter((item) =>
      relatedSlugs.includes(item.slug)
    );
  }

  /**
   * This is the method that was causing slug.replace() error. Now we:
   * 1) Use findEntityByIdentifier instead of findEntityBySlug
   * 2) Check if slug is a number or string
   */
  inferIndirectRelationships() {
    const collections = this.content.collections;

    collections.forEach((sourceCollection) => {
      const items = sourceCollection.items?.data || sourceCollection.items;
      if (!Array.isArray(items)) return;

      items.forEach((entity) => {
        // For each key that starts with "relatedTo", we have an array of slugs (or possibly numeric IDs)
        Object.keys(entity).forEach((relationKey) => {
          if (relationKey.startsWith("relatedTo")) {
            const targetCollectionName = relationKey
              .replace("relatedTo", "")
              .toLowerCase();
            const relatedSlugs = entity[relationKey] || [];

            relatedSlugs.forEach((identifier) => {
              // Use findEntityByIdentifier here
              const relatedEntity = this.findEntityByIdentifier(
                targetCollectionName,
                identifier
              );
              if (relatedEntity) {
                // That relatedEntity might have its own "relatedToXYZ" keys
                Object.keys(relatedEntity).forEach((relatedRelationKey) => {
                  if (relatedRelationKey.startsWith("relatedTo")) {
                    const indirectTarget = relatedRelationKey
                      .replace("relatedTo", "")
                      .toLowerCase();

                    const indirectSlugs = relatedEntity[relatedRelationKey] || [];

                    // Add these indirectSlugs to the current entity
                    const indirectRelationKey = `relatedTo${this.capitalize(
                      indirectTarget
                    )}`;
                    entity[indirectRelationKey] = entity[indirectRelationKey] || [];

                    // Add any missing slugs
                    indirectSlugs.forEach((indirectSlug) => {
                      if (!entity[indirectRelationKey].includes(indirectSlug)) {
                        entity[indirectRelationKey].push(indirectSlug);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    });
  }

  /**
   * If you have numeric or string "slugs" in relationships, do the same logic here.
   */
  getRelatedItemsByCount(collectionName, identifier) {
    const targetEntity = this.findEntityByIdentifier(collectionName, identifier);
    if (!targetEntity) return [];

    const relationshipCounts = {};

    // For each other collection, see if items have "relatedSlugs" that match
    this.content.collections.forEach((collection) => {
      if (collection.collection === collectionName) return;

      const items = collection.items?.data || collection.items || [];
      if (!Array.isArray(items)) return;

      items.forEach((item) => {
        // For each "relatedToSomething" key
        Object.keys(item).forEach((key) => {
          if (key.startsWith("relatedTo")) {
            const relatedSlugs = item[key]; // array of slugs or IDs
            // We compare the targetEntity's .slug to see if it's included
            if (Array.isArray(relatedSlugs) && 
                relatedSlugs.includes(targetEntity.slug)) 
            {
              relationshipCounts[item.slug] =
                (relationshipCounts[item.slug] || 0) + 1;
            }
          }
        });
      });
    });

    // Convert to an array of { ...item, count }
    const results = Object.entries(relationshipCounts).map(([itemSlug, count]) => {
      // find the item in the same collectionName or in the referencing collection?
      // If you want the referencing item from the “other” collection, do that:
      // e.g. "services" or "projects" ...
      const [col] = this.content.collections.filter((c) =>
        c.items?.data.some((i) => i.slug === itemSlug)
      );
      const foundItem = col?.items?.data.find((i) => i.slug === itemSlug);
      return foundItem ? { ...foundItem, count } : null;
    }).filter(Boolean);

    // Sort descending by count
    results.sort((a, b) => b.count - a.count);
    return results;
  }

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export default RelationalUtil;
