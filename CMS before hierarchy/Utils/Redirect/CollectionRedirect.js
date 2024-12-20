// CMS/Utils/CollectionRedirect.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import Content from "../../Content";

/**
 * Generate redirect routes for unprefixed and prefixed slugs.
 */
const generateRedirectRoutes = () => {
  const redirects = [];

  Content.collections
    .filter((collection) => collection.itemsHasPage && Array.isArray(collection.items))
    .forEach((collection) => {
      collection.items.forEach((item) => {
        if (item.redirectFrom && item.slug) {
          item.redirectFrom.forEach((redirectPath) => {
            redirects.push(
              <Route
                key={`${redirectPath}-to-${item.slug}`}
                path={redirectPath}
                element={<Navigate to={item.slug} replace />}
              />
            );
          });
        }
      });
    });

  return redirects;
};

export default generateRedirectRoutes;
