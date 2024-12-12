/* RelationsUtil.js */

export class RelationalUtil {
  constructor(content) {
    this.content = content;
    this.inferIndirectRelationships();
  }

  /**
   * Establish a bidirectional relationship between two entities using `slug` as the unique identifier.
   * @param {string} fromCollection - The collection name where the reference originates.
   * @param {string} fromSlug - The `slug` of the originating entity.
   * @param {string} toCollection - The collection name being referenced.
   * @param {string} toSlug - The `slug` of the entity being referenced.
   */
  relate(fromCollection, fromSlug, toCollection, toSlug) {
    const fromEntity = this.findEntityBySlug(fromCollection, fromSlug);
    const toEntity = this.findEntityBySlug(toCollection, toSlug);
  
    if (!fromEntity || !toEntity) {
      console.error(
        `Failed to create relationship: Invalid entities (${fromCollection}:${fromSlug} <-> ${toCollection}:${toSlug})`
      );
      return;
    }
  
    const fromRelationKey = `relatedTo${this.capitalize(toCollection)}`;
    const toRelationKey = `relatedTo${this.capitalize(fromCollection)}`;
  
    // Establish the relationship from fromEntity to toEntity
    fromEntity[fromRelationKey] = fromEntity[fromRelationKey] || [];
    if (!fromEntity[fromRelationKey].includes(toEntity.slug)) {
      fromEntity[fromRelationKey].push(toEntity.slug);
    }
  
    // Establish the reverse relationship from toEntity to fromEntity
    toEntity[toRelationKey] = toEntity[toRelationKey] || [];
    if (!toEntity[toRelationKey].includes(fromEntity.slug)) {
      toEntity[toRelationKey].push(fromEntity.slug);
    }
  
    // console.log(`Relationship created: ${fromCollection}:${fromSlug} (${fromRelationKey}) <-> ${toCollection}:${toSlug} (${toRelationKey})`);
  }  

  /**
   * Helper to find an entity in a collection by `slug`.
   * @param {string} collectionName - The collection to search.
   * @param {string} slug - The `slug` of the entity to find.
   * @returns {object|null} - The entity, or null if not found.
   */
  findEntityBySlug(collectionName, slug) {
    const collection = this.content.collections.find(
      (col) => col.collection === collectionName
    );
  
    if (!collection) {
      console.error(`Collection '${collectionName}' not found.`);
      return null;
    }
  
    // Check for exact match (prefixed or unprefixed)
    const entity =
      collection.items?.find(
        (item) =>
          item.slug === slug || // Matches if exact slug provided
          item.slug.endsWith(`/${slug.replace(/^\//, "")}`) // Handles unprefixed slugs
      ) || null;
  
    if (!entity) {
      console.error(
        `Entity with slug '${slug}' not found in collection '${collectionName}'.`
      );
    }
  
    return entity;
  }  

  /**
   * Query related items for a given entity by its slug and collection.
   * @param {string} collectionName - The collection name where the entity resides.
   * @param {string} slug - The `slug` of the entity to find relations for.
   * @param {string} targetCollection - The collection name to find related items from.
   * @returns {array} - List of related items.
   */
  getRelatedItems(collectionName, slug, targetCollection) {
    const entity = this.findEntityBySlug(collectionName, slug);
    if (!entity) return [];

    const relationKey = `relatedTo${this.capitalize(targetCollection)}`;
    const relatedSlugs = entity[relationKey] || [];

    const targetCollectionItems = this.content.collections.find(
      (col) => col.collection === targetCollection
    )?.items;

    return targetCollectionItems?.filter((item) =>
      relatedSlugs.includes(item.slug)
    ) || [];
  }

  /**
   * Helper to capitalize the first letter of a string.
   * @param {string} string - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  inferIndirectRelationships() {
    const collections = this.content.collections;
  
    collections.forEach((sourceCollection) => {
      if (sourceCollection.items) {
        sourceCollection.items.forEach((entity) => {
          // Iterate over each relationship key in the entity
          Object.keys(entity).forEach((relationKey) => {
            if (relationKey.startsWith("relatedTo")) {
              const targetCollectionName = relationKey.replace("relatedTo", "").toLowerCase();
              const relatedSlugs = entity[relationKey] || [];
  
              relatedSlugs.forEach((slug) => {
                // Resolve the directly related entity
                const relatedEntity = this.findEntityBySlug(targetCollectionName, slug);
  
                if (relatedEntity) {
                  // Check the related entity's relationships
                  Object.keys(relatedEntity).forEach((relatedRelationKey) => {
                    if (relatedRelationKey.startsWith("relatedTo")) {
                      const indirectTargetCollectionName = relatedRelationKey
                        .replace("relatedTo", "")
                        .toLowerCase();
                      const indirectSlugs = relatedEntity[relatedRelationKey] || [];
  
                      // Add the indirect relationship to the current entity
                      const indirectRelationKey = `relatedTo${this.capitalize(indirectTargetCollectionName)}`;
                      entity[indirectRelationKey] = entity[indirectRelationKey] || [];
  
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
      }
    }
  );
  }  

}

export default RelationalUtil;