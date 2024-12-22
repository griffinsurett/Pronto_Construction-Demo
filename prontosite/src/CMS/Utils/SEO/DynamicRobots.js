import { useEffect } from "react";
import processDynamicContent from "../Utils/DynamicContent/DynamicContentUtils";
import content from "../Content"; // Your CMS content

const DynamicRobots = () => {
  useEffect(() => {
    // Process the dynamic content
    const { processedPages } = processDynamicContent(content);

    // Generate the robots.txt content
    const disallowRules = processedPages
      .filter((page) => page.crawl === false)
      .map((page) => `Disallow: /${page.slug}`)
      .join("\n");

    const allowRules = processedPages
      .filter((page) => page.crawl === true)
      .map((page) => `Allow: /${page.slug}`)
      .join("\n");

    const robotsTxtContent = `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
${disallowRules}

${allowRules}
    `.trim();

    // Dynamically create the robots.txt content
    const blob = new Blob([robotsTxtContent], { type: "text/plain" });
    const robotsUrl = URL.createObjectURL(blob);

    // Dynamically create or overwrite the robots.txt
    const link = document.createElement("a");
    link.href = robotsUrl;
    link.download = "robots.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup the URL object
    URL.revokeObjectURL(robotsUrl);
  }, []);

  return null; // This is not a visible component
};

export default DynamicRobots;
