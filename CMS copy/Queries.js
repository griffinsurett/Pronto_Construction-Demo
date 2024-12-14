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

// Generate queries for the "Contact Info" section
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

// Generate queries for the "Social Media" section
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

// Generate queries for the "CTA" (Call-to-Action) section
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
        title: siteSettings.CTAButton, // Fallback value
        link: siteSettings.CTALink, // Fallback value
      },
      {
        title: "Call Us",
        link: `tel:${siteSettings.contactNumber}`, // Fallback phone number
      },
    ],
  };
};

// Generate queries dynamically
export function generateQueries(processedCollections, siteSettings) {
  const dynamicQueries = [];

  // Clone static queries into dynamic queries
  Queries.forEach((query) => {
    dynamicQueries.push({ ...query, items: [...query.items] });
  });

  // Find the "Contact" collection
  const contactCollection = processedCollections.find((col) => col.collection === "contact");

  // Generate dynamic queries
  const contactQuery = generateContactQuery(contactCollection);
  const socialMediaQuery = generateSocialMediaQuery(contactCollection);
  const ctaQuery = generateCTAQuery(siteSettings);

  // Push dynamic queries if applicable
  if (contactQuery) dynamicQueries.push(contactQuery);
  if (socialMediaQuery) dynamicQueries.push(socialMediaQuery);
  if (ctaQuery) dynamicQueries.push(ctaQuery);

  // Use BuildQueries to manage dynamic collections and submenu logic
  return BuildQueries(processedCollections, dynamicQueries);
}
