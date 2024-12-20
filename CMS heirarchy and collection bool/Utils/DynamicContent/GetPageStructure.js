// CMS/Utils/GetPageStructure.js
import Content from "../../Content";
import { getCollection } from "../GetContent/GetCollection";
import { RelationalUtil } from "../Relationships/RelationsUtil";
import HierarchyUtil from "../Relationships/HierarchyUtil";

const relationalUtil = new RelationalUtil(Content);
const hierarchyUtil = new HierarchyUtil(Content);

export const getPageStructure = (pageId) => {
  const page = Content.pages.find((p) => p.id === pageId);

  if (!page) {
    console.error(`[getPageStructure] Page '${pageId}' not found in CMS.`);
    return null;
  }

  const isCollectionPage = page.isCollection;
  const collection = isCollectionPage ? getCollection(pageId) : null;
  const isItemPage =
    collection &&
    Array.isArray(collection.items) &&
    collection.items.some((item) => item.slug === pageId);

  const item = isItemPage
    ? collection.items.find((i) => i.slug === pageId)
    : null;

  const featuredImage =
    item?.featuredImage || collection?.featuredImage || page.featuredImage;

  const title =
    item?.title ||
    item?.name ||
    page.title ||
    collection?.title ||
    "Untitled Page";

  const description =
    item?.description || collection?.paragraph || page.description || "";

  const content = page.content || item?.content || "";

  let sections = [];

  // Build object sections map (for makeObjectSection logic)
  const objectSectionsMap = {};
  Content.collections.forEach((col) => {
    for (const key in col) {
      if (col[key]?.makeObjectSection) {
        objectSectionsMap[key] = col[key];
      }
    }
  });

  if (isCollectionPage && !isItemPage && collection) {
    // 1. Handle Collection-Level Pages (Regular & Hierarchical)
    const aggregatedRelations = {};

    if (collection.isHeirarchical && collection.onlyParentsOnCollection) {
      const parents = hierarchyUtil.getParents(collection.collection);
      sections = page.sections.map((sectionKey) => {
        let sectionData;

        if (sectionKey === collection.collection) {
          sectionData = { ...collection, items: parents };
        } else if (sectionKey in collection) {
          sectionData = collection[sectionKey];
        } else if (objectSectionsMap[sectionKey]) {
          sectionData = objectSectionsMap[sectionKey];
        } else {
          sectionData = {
            ...(getCollection(sectionKey) || {}),
            items: aggregatedRelations[sectionKey] || [],
          };
        }

        return { key: sectionKey, data: sectionData };
      });
    } else {
      collection.items?.forEach((item) => {
        Object.keys(item).forEach((relationKey) => {
          if (relationKey.startsWith("relatedTo")) {
            const relatedCollectionName = relationKey.replace("relatedTo", "").toLowerCase();
            const relatedSlugs = item[relationKey] || [];
            const relatedItems = relatedSlugs
              .map((slug) => relationalUtil.findEntityBySlug(relatedCollectionName, slug))
              .filter(Boolean);

            aggregatedRelations[relatedCollectionName] =
              aggregatedRelations[relatedCollectionName] || [];
            aggregatedRelations[relatedCollectionName].push(...relatedItems);
          }
        });
      });

      sections = page.sections.map((sectionKey) => {
        let sectionData;

        if (sectionKey === collection.collection) {
          sectionData = collection;
        } else if (sectionKey in collection) {
          sectionData = collection[sectionKey];
        } else if (objectSectionsMap[sectionKey]) {
          sectionData = objectSectionsMap[sectionKey];
        } else {
          sectionData = {
            ...(getCollection(sectionKey) || {}),
            items: aggregatedRelations[sectionKey] || [],
          };
        }

        return { key: sectionKey, data: sectionData };
      });
    }
  } 
  else if (isItemPage && collection) {
    // 2. Handle Item-Level Pages (Hierarchical Logic Included)
    sections = page.sections.map((sectionKey) => {
      let sectionData;
  
      if (sectionKey === collection.collection && collection.isHeirarchical) {
        if (hierarchyUtil.isParent(item)) {
          // Fetch child items for the current parent
          const children = hierarchyUtil.getChildren(collection.collection, item.slug);
          // Include the parent collection slug and hasPage to enable the "View All" button
          sectionData = {
            title: "Child Items",
            items: children,
            slug: collection.slug,
            hasPage: collection.hasPage
          };
        } else {
          // Fetch siblings if no children exist
          const parentSlug = item.parentItem;
          if (parentSlug) {
            const siblings = hierarchyUtil.getSiblings(collection.collection, parentSlug, item.slug);
            // Again, include parent collection slug and hasPage
            sectionData = {
              title: "Related Services",
              items: siblings,
              slug: collection.slug,
              hasPage: collection.hasPage
            };
          } else {
            sectionData = { title: "No Related Items", items: [] };
          }
        }
      } else if (sectionKey in collection) {
        sectionData = collection[sectionKey];
      } else if (objectSectionsMap[sectionKey]) {
        sectionData = objectSectionsMap[sectionKey];
      } else {
        sectionData = getCollection(sectionKey, pageId) || null;
      }
  
      return { key: sectionKey, data: sectionData };
    });
  }  
   else {
    // 3. Handle Static Pages or Homepage
    sections = page.sections.map((sectionKey) => {
      let sectionData;
      const targetCollection = getCollection(sectionKey);

      // Apply onlyParentsOnCollection logic if applicable
      if (targetCollection?.isHeirarchical && targetCollection.onlyParentsOnCollection) {
        const parents = hierarchyUtil.getParents(targetCollection.collection);
        sectionData = { ...targetCollection, items: parents };
      } else if (objectSectionsMap[sectionKey]) {
        sectionData = objectSectionsMap[sectionKey];
      } else {
        sectionData = targetCollection || null;
      }

      return { key: sectionKey, data: sectionData };
    });
  }

  const pageStructure = { title, description, content, sections, featuredImage };
  return pageStructure;
};