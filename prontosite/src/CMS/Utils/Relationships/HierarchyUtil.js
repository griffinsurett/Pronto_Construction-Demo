/**
 * HierarchyUtil.js
 * Utility to manage hierarchical relationships between items.
 */

export default class HierarchyUtil {
  constructor(content) {
    this.content = content;
  }

  /**
   * Get children of a given item in a hierarchical collection.
   */
  getChildren(collectionName, parentSlug) {
    const collection = this.content.collections.find(
      (c) => c.collection === collectionName && c.items?.isHeirarchical
    );
    if (!collection || !collection.items || !Array.isArray(collection.items.data)) {
      return [];
    }

    const children = collection.items.data.filter(
      (item) => item.parentItem === parentSlug
    );
    console.log("Children Found:", children);
    return children;
  }

  getParents(collectionName) {
    const collection = this.content.collections.find(
      (c) => c.collection === collectionName && c.items?.isHeirarchical
    );
    if (!collection || !Array.isArray(collection.items?.data)) return [];

    // Filter items without a `parentItem`
    const parents = collection.items.data.filter((item) => !item.parentItem);
    return parents;
  }

  isParent(item) {
    return !item.parentItem;
  }

  getSiblings(collectionName, parentSlug, excludeSlug) {
    const collection = this.content.collections.find(
      (c) => c.collection === collectionName && c.items?.isHeirarchical
    );
    if (!collection || !Array.isArray(collection.items?.data)) return [];
    return collection.items.data.filter(
      (item) => item.parentItem === parentSlug && item.slug !== excludeSlug
    );
  }
}
