// App.js
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import DynamicRoutes from "./CMS/Utils/Routes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; 
import SetMetaInfo from "./CMS/Utils/SEO/SetMetaInfo";
import { initializeAnalyticsHead } from "./CMS/Headers-Footers/Headers";
import { initializeAnalyticsFooter } from "./CMS/Headers-Footers/Footers";

const App = () => {
  useEffect(() => {
    // Initialize analytics and SDKs for <head> and <footer>
    initializeAnalyticsHead();
    initializeAnalyticsFooter();
  }, []);

  return (
    <BrowserRouter>
        <SetMetaInfo />
      <ScrollToTop /> {/* Ensure ScrollToTop is included here */}
      <DynamicRoutes />
    </BrowserRouter>
  );
};

export default App;
