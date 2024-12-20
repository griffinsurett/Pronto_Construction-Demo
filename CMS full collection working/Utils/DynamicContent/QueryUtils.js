// QueryUtils.js
// Dynamically builds menus based on collections and pages.

const BuildQueries = (collections, queries) => {
  const dynamicQueries = [...queries]; // Clone the existing queries

  const processAddToQuery = ({ name: queryName, parentQueryItem, queryItemText, addItemsToQuery }, entity, isItem = false) => {
    if (!queryName) return;

    let targetQuery = dynamicQueries.find((query) => query.name === queryName);
    if (!targetQuery) {
      targetQuery = { id: dynamicQueries.length, name: queryName, items: [] };
      dynamicQueries.push(targetQuery);
    }

    // Determine the title for the query item
    let resolvedTitle;
    if (typeof queryItemText === "string") {
      resolvedTitle = entity[queryItemText] || queryItemText; // Use property or string directly
    } else {
      resolvedTitle = entity.title || entity.heading || "Untitled";
    }

    const queryItem = {
      id: entity.id || (isItem ? undefined : targetQuery.items.length),
      title: resolvedTitle,
      slug: entity.slug,
      link: entity.link || null,
      items: [],
    };

    // Add submenu items if `addItemsToQuery` is true and the entity has items
    if (addItemsToQuery && Array.isArray(entity.items)) {
      entity.items.forEach((item) => {
        queryItem.items.push({
          id: item.id || queryItem.items.length,
          title: item.title || item.name,
          slug: item.slug,
          link: item.link || null,
        });
      });
    }

    // Determine where to place the query item (as a child of `parentQueryItem` or at the top level)
    if (parentQueryItem !== undefined && parentQueryItem !== null) {
      const parentItem =
        typeof parentQueryItem === "number"
          ? targetQuery.items.find((item) => item.id === parentQueryItem)
          : targetQuery.items.find((item) => item.slug === parentQueryItem);

      if (parentItem) {
        parentItem.items = parentItem.items || [];
        parentItem.items.push(queryItem);
      } else {
        console.warn(
          `Parent query item '${parentQueryItem}' not found in query '${queryName}'. Adding to top level.`
        );
        targetQuery.items.push(queryItem);
      }
    } else {
      targetQuery.items.push(queryItem);
    }
  };

  // Process collections
  collections.forEach((collection) => {
    const targetQueries = Array.isArray(collection.addToQuery)
      ? collection.addToQuery
      : [collection.addToQuery].filter(Boolean);

    targetQueries.forEach((queryConfig) =>
      processAddToQuery(queryConfig, collection)
    );

    // Process individual items in the collection
    if (Array.isArray(collection.items)) {
      collection.items.forEach((item) => {
        if (item.addToQuery) {
          const itemQueries = Array.isArray(item.addToQuery)
            ? item.addToQuery
            : [item.addToQuery].filter(Boolean);

          itemQueries.forEach((queryConfig) =>
            processAddToQuery(queryConfig, item, true)
          );
        }
      });
    }
  });

  // Sort items in each query by their `id` (if present)
  dynamicQueries.forEach((query) => {
    query.items.sort((a, b) => (a.id || 0) - (b.id || 0));
  });

  return dynamicQueries;
};

export { BuildQueries };
