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
     * @param {string} collectionName - The hierarchical collection name.
     * @param {string} parentSlug - The slug of the parent item.
     * @returns {array} - Array of child items.
     */
    getChildren(collectionName, parentSlug) {
        const collection = this.content.collections.find(
          (c) => c.collection === collectionName && c.isHeirarchical
        );
      
        if (!collection || !Array.isArray(collection.items)) return [];
      
        // Filter children based only on parentItem
        const children = collection.items.filter(
          (item) => item.parentItem === parentSlug
        );
      
        console.log("Children Found:", children);
        return children;
      }       
  
    /**
     * Check if an item is a parent (no parentItem defined).
     * @param {object} item - The item object.
     * @returns {boolean} - True if parent, false otherwise.
     */
    isParent(item) {
      return !item.parentItem;
    }
  
    /**
     * Get siblings of a given child item.
     * Siblings are items that share the same parentItem in the same collection.
     * @param {string} collectionName - The hierarchical collection name.
     * @param {string} parentSlug - The slug of the parent item.
     * @param {string} excludeSlug - The slug of the current item to exclude it from siblings.
     * @returns {array} - Array of sibling items.
     */
    getSiblings(collectionName, parentSlug, excludeSlug) {
      const collection = this.content.collections.find(c => c.collection === collectionName && c.isHeirarchical);
      if (!collection || !Array.isArray(collection.items)) return [];
      return collection.items.filter(item => item.parentItem === parentSlug && item.slug !== excludeSlug);
    }
  }
  