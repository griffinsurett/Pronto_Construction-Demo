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

  // Helper function to aggregate cross-relations without losing lines
  const aggregateCrossRelations = (items) => {
    const aggregatedRelations = {};
    items?.forEach((itm) => {
      Object.keys(itm).forEach((relationKey) => {
        if (relationKey.startsWith("relatedTo")) {
          const relatedCollectionName = relationKey.replace("relatedTo", "").toLowerCase();
          const relatedSlugs = itm[relationKey] || [];
          const relatedItems = relatedSlugs
            .map((slug) => relationalUtil.findEntityBySlug(relatedCollectionName, slug))
            .filter(Boolean);

          aggregatedRelations[relatedCollectionName] =
            aggregatedRelations[relatedCollectionName] || [];
          aggregatedRelations[relatedCollectionName].push(...relatedItems);
        }
      });
    });

    // Deduplicate aggregated relations
    Object.keys(aggregatedRelations).forEach((key) => {
      aggregatedRelations[key] = [
        ...new Map(aggregatedRelations[key].map((i) => [i.slug, i])).values(),
      ];
    });

    return aggregatedRelations;
  };

  if (isCollectionPage && !isItemPage && collection) {
    // 1. Handle Collection-Level Pages (Regular & Hierarchical)
    const aggregatedRelations = {}; // Keep the variable for consistency

    if (collection.isHeirarchical && collection.onlyParentsOnCollection) {
      const parents = hierarchyUtil.getParents(collection.collection);
      // We don't remove aggregated relations logic; we just won't populate it here since only parents are shown.
      // However, we can still run the aggregator if needed:
      const crossRels = aggregateCrossRelations(collection.items);

      sections = page.sections.map((sectionKey) => {
        let sectionData;

        if (sectionKey === collection.collection) {
          sectionData = { ...collection, items: parents };
        } else if (sectionKey in collection) {
          sectionData = collection[sectionKey];
        } else if (objectSectionsMap[sectionKey]) {
          sectionData = objectSectionsMap[sectionKey];
        } else {
          // Use crossRels so that we don't lose any unrelated items
          sectionData = {
            ...(getCollection(sectionKey) || {}),
            items: crossRels[sectionKey] || [],
          };
        }

        return { key: sectionKey, data: sectionData };
      });
    } 
    else {
      // Original non-hierarchical collection page logic
      // We restore the original cross-relation aggregation here:
      const crossRels = aggregateCrossRelations(collection.items);

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
  }
   else if (isItemPage && collection) {
    // 2. Handle Item-Level Pages
    // Aggregate cross relations for this single item
    const crossRels = aggregateCrossRelations([item]);

    sections = page.sections.map((sectionKey) => {
      let sectionData;

      if (sectionKey === collection.collection && collection.isHeirarchical) {
        // Hierarchical logic
        if (hierarchyUtil.isParent(item)) {
          const children = hierarchyUtil.getChildren(collection.collection, item.slug);
          sectionData = {
            title: "Child Items",
            items: children,
            slug: collection.slug,
            hasPage: collection.hasPage
          };
        } else {
          const parentSlug = item.parentItem;
          if (parentSlug) {
            const siblings = hierarchyUtil.getSiblings(collection.collection, parentSlug, item.slug);
            sectionData = {
              title: `Related ${collection.title || collection.heading || "Items"}`,
              items: siblings,
              slug: collection.slug,
              hasPage: collection.hasPage
            };
          } else {
            sectionData = { title: "No Related Items", items: [] };
          }
        }
      } else if (sectionKey === collection.collection && !collection.isHeirarchical) {
        // Non-Hierarchical Collection Item Page Logic (Similarity Score)
        
        // Extract all relations from the current item
        const currentRelations = Object.keys(item)
          .filter((key) => key.startsWith("relatedTo"))
          .reduce((acc, relationKey) => {
            acc[relationKey] = item[relationKey] || [];
            return acc;
          }, {});

        // Calculate similarity scores for other items in the same collection
        const candidates = collection.items.filter((i) => i.slug !== item.slug);
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
        // Include cross relational data here as well, in case the sectionKey matches a related collection
        sectionData = {
          title: `Related ${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}`,
          items: crossRels[sectionKey]
        };
      } else {
        sectionData = getCollection(sectionKey, pageId) || null;
      }

      return { key: sectionKey, data: sectionData };
    });
  } else {
    // 3. Handle Static Pages or Homepage
    sections = page.sections.map((sectionKey) => {
      let sectionData;
      const targetCollection = getCollection(sectionKey);

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
