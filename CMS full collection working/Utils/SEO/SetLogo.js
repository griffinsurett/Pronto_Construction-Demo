export const setLogo = (siteLogo) => {
    if (!siteLogo) {
      console.warn("Site logo is not provided. Favicon will not be updated.");
      return;
    }
  
    // Ensure the favicon element exists or create it dynamically
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/png"; // Explicitly set type
      document.head.appendChild(favicon);
    }
  
    // Update the favicon's `href` with cache-busting
    favicon.href = `${siteLogo}?v=${new Date().getTime()}`;
  };
  