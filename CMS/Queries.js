// Queries.js
import { BuildQueries } from "./Utils/DynamicContent/QueryUtils";

// Define static query structure
const Queries = [
  {
    id: 0,
    name: "Primary",
    items: [
      { title: "Home", slug: "/" }, // Static query item
    ],
  },
  {
    id: 1,
    name: "Footer",
    items: [
      { title: "Privacy Policy", slug: "/privacy-policy" },
      { title: "Cookie Policy", slug: "/cookie-policy" },
    ],
  },
];

const generateContactQuery = (contactCollection) => {
  if (!contactCollection || !contactCollection.contactInfo) return null;

  return {
    id: Queries.length,
    name: "Contact Info",
    items: contactCollection.contactInfo.map((info) => ({
      title: info.label,
      link: info.href,
    })),
  };
};

const generateSocialMediaQuery = (contactCollection) => {
  if (!contactCollection || !contactCollection.socialMedia) return null;

  return {
    id: Queries.length + 1,
    name: "Social Media",
    items: contactCollection.socialMedia.map((social) => ({
      title: social.platform,
      link: social.href,
      icon: social.icon,
    })),
  };
};

const generateCTAQuery = (siteSettings) => {
  if (!siteSettings) {
    console.error("generateCTAQuery: siteSettings is undefined");
    return null;
  }

  return {
    id: Queries.length + 2,
    name: "CTA",
    items: [
      {
        title: siteSettings.CTAButton || "Get a Quote", // Fallback value
        link: siteSettings.CTALink || "/contact-us",   // Fallback value
      },
      {
        title: "Call Us",
        link: `tel:${siteSettings.contactNumber || "1234567890"}`, // Fallback phone number
      },
    ],
  };
};

export function generateQueries(processedCollections, siteSettings) {
  // Initialize a new queries array to avoid duplication
  const dynamicQueries = [];

  // Start with static queries
  Queries.forEach((query) => {
    dynamicQueries.push({ ...query, items: [...query.items] });
  });

  // Find the contact collection
  const contactCollection = processedCollections.find((col) => col.collection === "contact");

  // Add dynamic queries
  const contactQuery = generateContactQuery(contactCollection);
  const socialMediaQuery = generateSocialMediaQuery(contactCollection);
  const ctaQuery = generateCTAQuery(siteSettings);

  if (contactQuery) dynamicQueries.push(contactQuery);
  if (socialMediaQuery) dynamicQueries.push(socialMediaQuery);
  if (ctaQuery) dynamicQueries.push(ctaQuery);

  // Use BuildQueries to dynamically build menus from collections
  return BuildQueries(processedCollections, dynamicQueries);
}