import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Content from "../Content";
import PickTheme from "../../PickTheme";
import CollectionRedirect from "./Redirect/CollectionRedirect";
import RedirectUtils from "./Redirect/RedirectFrom";

const DynamicRoutes = () => {
  // Separate static pages and collection pages
  const staticPages = Content.pages.filter((page) => !page.isCollection);
  const collectionPages = Content.pages.filter((page) => page.isCollection);
  const errorPage = Content.pages.find((page) => page.id === "error");

  return (
    <Routes>
      {/* Static Page Routes */}
      {staticPages.map((page) => (
        <Route
          key={page.id}
          path={page.slug}
          element={<PickTheme pageId={page.id} />}
        />
      ))}

      {/* Collection Page Routes */}
      {collectionPages.map((page) => (
        <Route
          key={page.id}
          path={page.slug}
          element={<PickTheme pageId={page.id} />}
        />
      ))}

      {/* Redirects */}
      {CollectionRedirect()}
      {RedirectUtils()}

      {/* Fallback Route for non-existent paths */}
      {errorPage && (
        <Route
          path="*"
          element={<Navigate to={errorPage.slug} replace />}
        />
      )}
    </Routes>
  );
};

export default DynamicRoutes;
