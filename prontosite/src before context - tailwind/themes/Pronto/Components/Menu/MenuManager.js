// Theme/Components/Menus/MenuManager.js
export default class MenuManager {
    constructor(siteSettings) {
      this.siteSettings = siteSettings;
      this.menus = this.initializeMenus();
    }
  
    // Initialize menus from CMS queries
    initializeMenus() {
      const { queries } = this.siteSettings;
      if (!queries || !Array.isArray(queries)) {
        console.error("MenuManager: Invalid queries data");
        return {};
      }
  
      // Process queries into a key-value menu map
      return queries.reduce((menus, query) => {
        menus[query.name] = this.processMenuItems(query.items);
        return menus;
      }, {});
    }
  
    // Process menu items recursively to handle hierarchical structures
    processMenuItems(items) {
      return items.map((item) => ({
        ...item,
        items: item.items ? this.processMenuItems(item.items) : [],
      }));
    }
  
    // Get a menu by name
    getMenu(menuName) {
      return this.menus[menuName] || [];
    }
  
    // Apply theme-specific rules for hierarchical menus
    getHierarchicalMenu(menuName) {
      const menu = this.getMenu(menuName);
      console.log("Hierarchical Menu:", JSON.stringify(menu, null, 2)); // Debug log
      return menu.map((item) => ({
        ...item,
        isParent: item.items && item.items.length > 0,
      }));
    }
  
    // Apply rules for flat menus (e.g., social media)
    getFlatMenu(menuName) {
      const menu = this.getMenu(menuName);
      return menu.filter((item) => !item.items || item.items.length === 0);
    }
  }