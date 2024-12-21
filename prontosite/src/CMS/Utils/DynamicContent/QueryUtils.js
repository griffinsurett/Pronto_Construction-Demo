// Utils/DynamicContent/QueryUtils.js

function buildHierarchy(items) {
  const itemMap = {};
  items.forEach((itm) => {
    itemMap[itm.slug] = {
      ...itm,
      items: [], 
    };
  });

  const roots = [];
  items.forEach((itm) => {
    if (itm.parentItem) {
      const parent = itemMap[itm.parentItem];
      if (parent) {
        parent.items.push(itemMap[itm.slug]);
      } else {
        // If the parent doesn't exist, treat it as a root
        roots.push(itemMap[itm.slug]);
      }
    } else {
      roots.push(itemMap[itm.slug]);
    }
  });

  return roots;
}

function transformToMenuItems(items) {
  return items.map((item, index) => ({
    id: item.id || index,
    title: item.title || item.name || "Untitled",
    slug: item.slug,
    link: item.link || null,
    items: transformToMenuItems(item.items || []),
  }));
}

const BuildQueries = (collections, queries) => {
  const dynamicQueries = [...queries];

  /**
   * Helper to locate an existing menu item by slug or id.
   */
  const findMenuItem = (menuItems, parentQueryItem) => {
    if (parentQueryItem === undefined || parentQueryItem === null) {
      return null;
    }
    if (typeof parentQueryItem === "number") {
      return menuItems.find((it) => it.id === parentQueryItem);
    }
    return menuItems.find((it) => it.slug === parentQueryItem);
  };

  /**
   * Helper to add sub-items (entity.items.data) into the menu, either at top-level or under parent.
   * If `excludeCollection` is true, we can pass in `inheritedId` so sub-items share that numeric ID.
   */
 // Utils/DynamicContent/QueryUtils.js

function addSubItems(parent, entity, query, setChildrenUnderParents, inheritedId) {
  if (!entity.items || !Array.isArray(entity.items.data)) return;

  // If the parent entity’s config has `onlyParentItemsHasPage=true`
  // we skip children that have a parentItem.
  const onlyParentItemsHasPage = entity.items.onlyParentItemsHasPage === true;

  const baseId =
    typeof inheritedId === "number"
      ? inheritedId
      : typeof entity.id === "number"
      ? entity.id
      : query.items.length;

  const dataArray = entity.items.data;
  if (setChildrenUnderParents && entity.items.isHeirarchical) {
    // BUILD HIERARCHY
    const roots = buildHierarchy(dataArray);
    const itemsAsMenu = transformToMenuItems(roots);

    // If skipping child items in queries => remove them from `itemsAsMenu`
    if (onlyParentItemsHasPage) {
      // Filter out any item that has a parentItem
      itemsAsMenu.forEach((rootItem) => {
        rootItem.items = []; // no grandchildren
      });
    }

    // Force all children to share the parent's ID
    itemsAsMenu.forEach((subItem) => {
      subItem.id = baseId;
      propagateId(subItem.items, baseId);
    });

    if (parent) {
      parent.items.push(...itemsAsMenu);
    } else {
      query.items.push(...itemsAsMenu);
    }
  } else {
    // NON-HIERARCHICAL
    dataArray.forEach((subItem) => {
      // If `onlyParentItemsHasPage` is true and subItem has a parentItem => skip
      if (onlyParentItemsHasPage && subItem.parentItem) return;

      const newItem = {
        id: baseId,
        title: subItem.title || subItem.name || "Untitled",
        slug: subItem.slug,
        link: subItem.link || null,
        items: [],
      };

      if (parent) {
        parent.items.push(newItem);
      } else {
        query.items.push(newItem);
      }
    });
  }
}

  /**
   * Recursively set the .id on children if we want them all to share the same ID
   */
  const propagateId = (items, baseId) => {
    items.forEach((itm) => {
      itm.id = baseId;
      if (itm.items && itm.items.length) {
        propagateId(itm.items, baseId);
      }
    });
  };

  /**
   * The main function that processes a single 'addToQuery' config
   */
  const processAddToQuery = (
    {
      name: queryName,
      parentQueryItem,
      queryItemText,
      addItemsToQuery,
      setChildrenUnderParents,
      excludeCollection = false, // New field
    },
    entity,
    isItem = false
  ) => {
    if (!queryName) return;

    // 1) Get or create the target query
    let targetQuery = dynamicQueries.find((q) => q.name === queryName);
    if (!targetQuery) {
      targetQuery = { id: dynamicQueries.length, name: queryName, items: [] };
      dynamicQueries.push(targetQuery);
    }

    // 2) If excludeCollection is true (AND this is the parent collection, not an item):
    //    - We skip creating a menu item for the collection,
    //    - We directly add its sub-items to the parent or top-level, inheriting the parent's ID.
    if (excludeCollection && !isItem) {
      const parentItem = findMenuItem(targetQuery.items, parentQueryItem);

      if (addItemsToQuery) {
        // we pass the parent entity's ID to sub-items
        addSubItems(parentItem, entity, targetQuery, setChildrenUnderParents, entity.id);
      }
      return; // Done, skipping creation of the collection menu item.
    }

    // 3) Normal logic: build a query item for the entity
    let resolvedTitle;
    if (typeof queryItemText === "string") {
      resolvedTitle = entity[queryItemText] || queryItemText;
    } else {
      resolvedTitle = entity.title || entity.heading || "Untitled";
    }

    // If no explicit ID, fallback to the end of the array
    const fallbackId = targetQuery.items.length; 
    const newId = typeof entity.id === "number" ? entity.id : fallbackId;

    const queryItem = {
      id: newId,
      title: resolvedTitle,
      slug: entity.slug,
      link: entity.link || null,
      items: [],
    };

    // 4) If we want sub-items under this entity
    if (addItemsToQuery) {
      addSubItems(queryItem, entity, targetQuery, setChildrenUnderParents, newId);
    }

    // 5) Attach queryItem to the parent or top-level
    const parentItem = findMenuItem(targetQuery.items, parentQueryItem);
    if (parentItem) {
      parentItem.items.push(queryItem);
    } else {
      targetQuery.items.push(queryItem);
    }
  };

  // ---- MAIN BUILD LOGIC ----
  collections.forEach((collection) => {
    const targetConfigs = Array.isArray(collection.addToQuery)
      ? collection.addToQuery
      : [collection.addToQuery].filter(Boolean);

    targetConfigs.forEach((queryConfig) =>
      processAddToQuery(queryConfig, collection)
    );

    // If sub-items also have addToQuery
    if (collection.items && Array.isArray(collection.items.data)) {
      collection.items.data.forEach((item) => {
        if (item.addToQuery) {
          const itemConfigs = Array.isArray(item.addToQuery)
            ? item.addToQuery
            : [item.addToQuery].filter(Boolean);

          itemConfigs.forEach((queryConfig) =>
            processAddToQuery(queryConfig, item, true)
          );
        }
      });
    }
  });

  // Final sorting by .id, so items that share an ID stay together
  dynamicQueries.forEach((query) => {
    query.items.sort((a, b) => (a.id || 0) - (b.id || 0));
  });

  return dynamicQueries;
};

export { BuildQueries };
