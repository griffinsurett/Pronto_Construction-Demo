/**
 * analytics.js
 * Handles the integration of Facebook Pixel and Google Analytics.
 */

/**
 * analytics.js
 * Handles the integration of analytics and external SDKs.
 */

// export const initializeGoogleAnalytics = () => {
//     if (!document.querySelector("script[src*='www.googletagmanager.com/gtag/js']")) {
//       const gaScript = document.createElement("script");
//       gaScript.async = true;
//       gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_TRACKING_ID}`;
//       document.head.appendChild(gaScript);
  
//       gaScript.onload = () => {
//         if (window.gtag) {
//           window.gtag("js", new Date());
//           window.gtag("config", process.env.REACT_APP_GA_TRACKING_ID, { send_page_view: true });
//           console.log("Google Analytics initialized");
//         }
//       };
//     }
//   };
  
//   export const initializeGoogleTagManager = () => {
//     if (!document.querySelector("script[src*='www.googletagmanager.com/gtm.js']")) {
//       const gtmScript = document.createElement("script");
//       gtmScript.async = true;
//       gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.REACT_APP_GTM_ID}`;
//       document.head.appendChild(gtmScript);
  
//       const gtmNoScript = document.createElement("noscript");
//       gtmNoScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.REACT_APP_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
//       document.body.appendChild(gtmNoScript);
  
//       console.log("Google Tag Manager initialized");
//     }
//   };
  
//   export const initializeFacebookPixel = () => {
//     if (!document.querySelector("script[src*='connect.facebook.net']")) {
//       const fbScript = document.createElement("script");
//       fbScript.async = true;
//       fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
//       document.head.appendChild(fbScript);
  
//       fbScript.onload = () => {
//         if (window.fbq) {
//           window.fbq("init", process.env.REACT_APP_FB_PIXEL_ID);
//           window.fbq("track", "PageView");
//           console.log("Facebook Pixel initialized");
//         } else {
//           window.fbq = function () {
//             window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
//           };
//           window.fbq.queue = [];
//           window.fbq.version = "2.0";
//           window.fbq.loaded = true;
//           window.fbq("init", process.env.REACT_APP_FB_PIXEL_ID);
//           window.fbq("track", "PageView");
//           console.log("Facebook Pixel initialized");
//         }
//       };
//     }
//   };
  
//   export const initializeGoogleSearchConsole = () => {
//     const metaTag = document.createElement("meta");
//     metaTag.name = "google-site-verification";
//     metaTag.content = process.env.REACT_APP_GOOGLE_SEARCH_CONSOLE_ID;
//     if (!document.querySelector("meta[name='google-site-verification']")) {
//       document.head.appendChild(metaTag);
//       console.log("Google Search Console meta tag added.");
//     }
//   };
  
//   export const initializeFacebookSDK = () => {
//     // Check if the Facebook SDK script is already added
//     if (!document.querySelector("script[src*='connect.facebook.net']")) {
//       const fbSdkScript = document.createElement("script");
//       fbSdkScript.async = true;
//       fbSdkScript.defer = true;
//       fbSdkScript.crossOrigin = "anonymous";
//       fbSdkScript.src = "https://connect.facebook.net/en_US/sdk.js";
//       document.head.appendChild(fbSdkScript);
  
//       // Initialize the SDK once the script loads
//       fbSdkScript.onload = () => {
//         if (!window.fbAsyncInit) {
//           window.fbAsyncInit = () => {
//             if (typeof FB !== "undefined") {
//               FB.init({
//                 appId: process.env.REACT_APP_FB_APP_ID,
//                 autoLogAppEvents: true,
//                 xfbml: true,
//                 version: "v14.0",
//               });
//               console.log("Facebook SDK initialized");
//             } else {
//               console.error("Facebook SDK failed to load.");
//             }
//           };
//         }
//       };
//     } else {
//       console.log("Facebook SDK script already loaded.");
//       // If script is already loaded, manually initialize
//       if (typeof FB !== "undefined" && typeof FB.init === "function") {
//         FB.init({
//           appId: process.env.REACT_APP_FB_APP_ID,
//           autoLogAppEvents: true,
//           xfbml: true,
//           version: "v14.0",
//         });
//         console.log("Facebook SDK initialized after check.");
//       }
//     }
//   };   
  
//   export const initializeGoogleMaps = () => {
//     if (!document.querySelector("script[src*='maps.googleapis.com']")) {
//       const mapsScript = document.createElement("script");
//       mapsScript.async = true;
//       mapsScript.defer = true;
//       mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
//       document.head.appendChild(mapsScript);
  
//       mapsScript.onload = () => {
//         console.log("Google Maps script loaded.");
//       };
//     }
//   };
  