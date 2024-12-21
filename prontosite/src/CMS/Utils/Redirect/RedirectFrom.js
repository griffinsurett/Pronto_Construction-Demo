// Redirect/RedirectFrom.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import Content from "../../Content";

const generateRedirectFromRoutes = () => {
  const redirects = [];

  Content.collections.forEach((collection) => {
    // Handle collection-level redirects
    if (collection.redirectFrom) {
      collection.redirectFrom.forEach((redirectPath) => {
        redirects.push(
          <Route
            key={`redirect-collection-${redirectPath}`}
            path={redirectPath}
            element={<Navigate to={collection.slug} replace />}
          />
        );

        // Nested redirect handling
        if (collection.items && Array.isArray(collection.items.data)) {
          collection.items.data.forEach((item) => {
            const nestedSlug = item.slug.replace(collection.slug, ""); // Extract relative slug
            redirects.push(
              <Route
                key={`nested-redirect-${redirectPath}${nestedSlug}`}
                path={`${redirectPath}${nestedSlug}`}
                element={<Navigate to={`${collection.slug}${nestedSlug}`} replace />}
              />
            );
          });
        }
      });
    }

    // Handle item-specific redirects
    if (collection.items && Array.isArray(collection.items.data)) {
      collection.items.data.forEach((item) => {
        if (item.redirectFrom) {
          item.redirectFrom.forEach((redirectPath) => {
            redirects.push(
              <Route
                key={`redirect-item-${redirectPath}`}
                path={redirectPath}
                element={<Navigate to={item.slug} replace />}
              />
            );
          });
        }
      });
    }
  });

  return redirects;
};

export default generateRedirectFromRoutes;
