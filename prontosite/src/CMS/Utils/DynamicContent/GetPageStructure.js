// Utils/DynamicContent/GetPageStructure.js
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

  // We must check if the item is inside collection.items.data
  const isItemPage =
    collection &&
    collection.items &&
    Array.isArray(collection.items.data) &&
    collection.items.data.some((item) => item.slug === pageId);

  // If it's an item page, get the actual item
  const item = isItemPage
    ? collection.items.data.find((i) => i.slug === pageId)
    : null;

  // Featured image priority: item -> collection -> page
  const featuredImage =
    item?.featuredImage || collection?.featuredImage || page.featuredImage;

  const title =
    item?.title ||
    item?.name ||
    page.title ||
    collection?.title ||
    "Untitled Page";

  const description =
    item?.description ||
    collection?.paragraph ||
    // If no collection-level paragraph, maybe check collection.items.paragraph
    collection?.items?.paragraph ||
    page.description ||
    "";

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

  const aggregateCrossRelations = (items) => {
    const aggregatedRelations = {};
    items?.forEach((itm) => {
      Object.keys(itm).forEach((relationKey) => {
        if (relationKey.startsWith("relatedTo")) {
          const relatedCollectionName = relationKey
            .replace("relatedTo", "")
            .toLowerCase();
          const relatedSlugs = itm[relationKey] || [];
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

    // Deduplicate aggregated
    Object.keys(aggregatedRelations).forEach((key) => {
      aggregatedRelations[key] = [
        ...new Map(aggregatedRelations[key].map((i) => [i.slug, i])).values(),
      ];
    });

    return aggregatedRelations;
  };

  if (isCollectionPage && !isItemPage && collection) {
    // COLLECTION-LEVEL PAGE
    if (
      collection.items?.isHeirarchical &&
      collection.onlyParentsOnCollection
    ) {
      const parents = hierarchyUtil.getParents(collection.collection);
      const crossRels = aggregateCrossRelations(collection.items.data);

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
            items: crossRels[sectionKey] || [],
          };
        }
        return { key: sectionKey, data: sectionData };
      });
    } else {
      // NON-HIERARCHICAL
      const crossRels = aggregateCrossRelations(collection.items?.data);
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
            items: crossRels[sectionKey] || [],
          };
        }

        return { key: sectionKey, data: sectionData };
      });
    }
  } else if (isItemPage && collection) {
    // ITEM-LEVEL PAGE
    const crossRels = aggregateCrossRelations([item]);

    sections = page.sections.map((sectionKey) => {
      let sectionData;

      // HIERARCHICAL SCENARIO
      if (sectionKey === collection.collection && collection.items?.isHeirarchical) {
        if (hierarchyUtil.isParent(item)) {
          const children = hierarchyUtil.getChildren(
            collection.collection,
            item.slug
          );
          sectionData = {
            title: "Child Items",
            items: children,
            slug: collection.slug,
            hasPage: collection.hasPage,
          };
        } else {
          const parentSlug = item.parentItem;
          if (parentSlug) {
            const siblings = hierarchyUtil.getSiblings(
              collection.collection,
              parentSlug,
              item.slug
            );
            sectionData = {
              title: `Related ${collection.title || collection.heading || "Items"}`,
              items: siblings,
              slug: collection.slug,
              hasPage: collection.hasPage,
            };
          } else {
            sectionData = { title: "No Related Items", items: [] };
          }
        }
      } else if (
        sectionKey === collection.collection &&
        !collection.items?.isHeirarchical
      ) {
        // NON-HIERARCHICAL ITEM PAGE LOGIC
        const currentRelations = Object.keys(item)
          .filter((key) => key.startsWith("relatedTo"))
          .reduce((acc, relationKey) => {
            acc[relationKey] = item[relationKey] || [];
            return acc;
          }, {});

        const candidates = collection.items.data.filter(
          (i) => i.slug !== item.slug
        );
        const scoredCandidates = candidates.map((candidate) => {
          let score = 0;
          Object.keys(currentRelations).forEach((relationKey) => {
            const candidateRelations = candidate[relationKey] || [];
            const overlapCount = candidateRelations.filter((slug) =>
              currentRelations[relationKey].includes(slug)
            ).length;
            score += overlapCount;
          });
          return { ...candidate, score };
        });

        const relatedItems = scoredCandidates
          .filter((c) => c.score > 0)
          .sort((a, b) => b.score - a.score);

        if (relatedItems.length > 0) {
          sectionData = {
            title: `Related ${collection.title || collection.heading || "Items"}`,
            items: relatedItems,
            slug: collection.slug,
            hasPage: collection.hasPage,
          };
        } else {
          sectionData = { title: "No Related Items", items: [] };
        }
      } else if (sectionKey in collection) {
        sectionData = collection[sectionKey];
      } else if (objectSectionsMap[sectionKey]) {
        sectionData = objectSectionsMap[sectionKey];
      } else if (crossRels[sectionKey]) {
        // If the sectionKey matches a related collection
        sectionData = {
          title: `Related ${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}`,
          items: crossRels[sectionKey],
        };
      } else {
        sectionData = getCollection(sectionKey, pageId) || null;
      }

      return { key: sectionKey, data: sectionData };
    });
  } else {
    // STATIC OR HOMEPAGE
    sections = page.sections.map((sectionKey) => {
      let sectionData;
      const targetCollection = getCollection(sectionKey);

      if (
        targetCollection?.items?.isHeirarchical &&
        targetCollection.onlyParentsOnCollection
      ) {
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
