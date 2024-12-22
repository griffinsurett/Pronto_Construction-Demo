/**
 * setMetaInfo.js
 * Dynamically sets the document's main meta tags.
 */

export const setMetaInfo = ({
  title,
  description,
  keywords = [],
  siteTitle,
  author,
  image = null, // New parameter for Open Graph/Twitter card images
  url = window.location.href, // Use the current page URL as default
}) => {
  console.log("setMetaInfo: Setting meta information", { title, description, keywords, siteTitle, author });

  // Set the document title
  const fullTitle = title !== "Untitled Page" ? `${title} - ${siteTitle}` : siteTitle;
  document.title = fullTitle;
  console.log("Document title set:", document.title);

  // Meta description
  let metaDescription = document.querySelector("meta[name='description']");
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;

  // Meta keywords
  let metaKeywords = document.querySelector("meta[name='keywords']");
  if (!metaKeywords) {
    metaKeywords = document.createElement("meta");
    metaKeywords.name = "keywords";
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = keywords.join(", ");
  console.log("Meta keywords set:", metaKeywords.content);

  // Meta author
  let metaAuthor = document.querySelector("meta[name='author']");
  if (!metaAuthor) {
    metaAuthor = document.createElement("meta");
    metaAuthor.name = "author";
    document.head.appendChild(metaAuthor);
  }
  metaAuthor.content = author;

  console.log("Meta author set:", metaAuthor.content);

  // Canonical URL
  let canonicalLink = document.querySelector("link[rel='canonical']");
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = url;
  console.log("Canonical URL set:", canonicalLink.href);

  // Inject structured data (Schema.org JSON-LD)
  const scriptId = "structured-data";
  let structuredDataScript = document.getElementById(scriptId);
  if (!structuredDataScript) {
    structuredDataScript = document.createElement("script");
    structuredDataScript.id = scriptId;
    structuredDataScript.type = "application/ld+json";
    document.head.appendChild(structuredDataScript);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: fullTitle, // Append siteTitle
    description: description,
    url,
    ...(image && { image }),
  };

  structuredDataScript.textContent = JSON.stringify(schemaData, null, 2);
  console.log("Structured data set:", schemaData);

 // Open Graph tags
 const ogTags = {
  "og:title": title,
  "og:description": description,
  "og:image": image,
  "og:url": url,
  "og:type": "website",
};
for (const [property, content] of Object.entries(ogTags)) {
  let tag = document.querySelector(`meta[property='${property}']`) || document.createElement("meta");
  tag.setAttribute("property", property);
  tag.content = content;
  document.head.appendChild(tag);
}

// Twitter tags
const twitterTags = {
  "twitter:card": "summary_large_image",
  "twitter:title": title,
  "twitter:description": description,
  "twitter:image": image,
};
for (const [name, content] of Object.entries(twitterTags)) {
  let tag = document.querySelector(`meta[name='${name}']`) || document.createElement("meta");
  tag.setAttribute("name", name);
  tag.content = content;
  document.head.appendChild(tag);
}
};
