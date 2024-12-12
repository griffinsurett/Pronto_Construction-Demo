// CMS/Utils/GetPageStructure.js
import Content from "../../Content";
import { getCollection } from "../GetContent/GetCollection";
import { RelationalUtil } from "../Relationships/RelationsUtil";

const relationalUtil = new RelationalUtil(Content);

export const getPageStructure = (pageId) => {
  const page = Content.pages.find((p) => p.id === pageId);

  if (!page) {
    console.error(`[getPageStructure] Page '${pageId}' not found in CMS.`);
    return null;
  }

  // Determine if the page is a collection or an item page
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

  // Build a map of object sections (makeObjectSection: true)
  const objectSectionsMap = {};
  Content.collections.forEach((col) => {
    for (const key in col) {
      if (
        col[key] &&
        typeof col[key] === "object" &&
        col[key].makeObjectSection
      ) {
        // Store this property as a standalone section
        objectSectionsMap[key] = col[key];
      }
    }
  });

  if (isCollectionPage && !isItemPage && collection) {
    // Handle collection-level pages (unchanged logic)
    const aggregatedRelations = {};

    if (Array.isArray(collection.items)) {
      collection.items.forEach((item) => {
        Object.keys(item).forEach((relationKey) => {
          if (relationKey.startsWith("relatedTo")) {
            const relatedCollectionName = relationKey
              .replace("relatedTo", "")
              .toLowerCase();
            const relatedSlugs = item[relationKey] || [];
            const relatedItems = relatedSlugs
              .map((slug) =>
                relationalUtil.findEntityBySlug(relatedCollectionName, slug)
              )
              .filter(Boolean);

            aggregatedRelations[relatedCollectionName] =
              aggregatedRelations[relatedCollectionName] || [];
            aggregatedRelations[relatedCollectionName].push(...relatedItems);
          }
        });
      });

      // Deduplicate
      Object.keys(aggregatedRelations).forEach((key) => {
        aggregatedRelations[key] = [
          ...new Map(aggregatedRelations[key].map((i) => [i.slug, i])).values(),
        ];
      });
    }

    sections = page.sections.map((sectionKey) => {
      let sectionData;

      if (sectionKey === collection.collection) {
        sectionData = collection;
      } else if (sectionKey in collection) {
        sectionData = collection[sectionKey];
      } else if (objectSectionsMap[sectionKey]) {
        // If it's a makeObjectSection sub-object
        sectionData = objectSectionsMap[sectionKey];
      } else {
        sectionData = {
          ...(getCollection(sectionKey) || {}),
          items: aggregatedRelations[sectionKey] || [],
        };
      }

      return { key: sectionKey, data: sectionData };
    });
  } else if (isItemPage && collection) {
    // Handle item-level pages
    sections = page.sections.map((sectionKey) => {
      let sectionData;
      if (sectionKey === collection.collection) {
        sectionData = item;
      } else if (sectionKey in collection) {
        sectionData = collection[sectionKey];
      } else if (objectSectionsMap[sectionKey]) {
        sectionData = objectSectionsMap[sectionKey];
      } else {
        sectionData = getCollection(sectionKey, pageId) || null;
      }

      return { key: sectionKey, data: sectionData };
    });
  } else {
    // Handle static pages or homepage
    sections = page.sections.map((sectionKey) => {
      if (objectSectionsMap[sectionKey]) {
        // If we have a makeObjectSection sub-object matching this key
        return { key: sectionKey, data: objectSectionsMap[sectionKey] };
      } else {
        const sectionData = getCollection(sectionKey, pageId) || null;
        return { key: sectionKey, data: sectionData };
      }
    });
  }

  const pageStructure = { title, description, content, sections, featuredImage };
  return pageStructure;
};
