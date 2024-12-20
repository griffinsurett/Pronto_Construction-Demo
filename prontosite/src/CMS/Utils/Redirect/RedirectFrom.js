// Utils/Redirect/RedirectFrom.js
// Utils/Redirect/RedirectFrom.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import Content from "../../Content";

/**
 * Generate redirect routes for `redirectFrom` entries in collections and items.
 */
const generateRedirectFromRoutes = () => {
  const redirects = [];

  // Process collections for redirectFrom
  Content.collections.forEach((collection) => {
    if (collection.redirectFrom) {
      collection.redirectFrom.forEach((redirectPath) => {
        redirects.push(
          <Route
            key={`redirect-collection-${redirectPath}`}
            path={redirectPath}
            element={<Navigate to={collection.slug} replace />}
          />
        );
      });
    }

    // Process items within collections for redirectFrom
    if (collection.itemsHasPage && Array.isArray(collection.items)) {
      collection.items.forEach((item) => {
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

        // Handle alternate base slugs for items (e.g., `/service/construction`)
        const baseRedirects = collection.redirectFrom || [];
        baseRedirects.forEach((baseRedirect) => {
          redirects.push(
            <Route
              key={`fallback-item-${baseRedirect}/${item.slug}`}
              path={`${baseRedirect}${item.slug}`}
              element={<Navigate to={item.slug} replace />}
            />
          );
        });
      });
    }
  });

  return redirects;
};

export default generateRedirectFromRoutes;
