// components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, [pathname]); // Trigger whenever the route (pathname) changes

  return null; // This component does not render anything in the DOM
};

export default ScrollToTop;
