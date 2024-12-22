const defaultPages = [
  {
    id: "home",
    slug: "/",
    title: "Home",
    crawl: true, // Set explicit crawl status
  },
  {
    id: "error",
    slug: "/error",
    title: "Page Not Found",
    content: "Oops! The page you're looking for doesn't exist.",
    crawl: false, // Error page should not be crawled
  },
  {
    id: "cookie-policy",
    slug: "/cookie-policy",
    title: "Cookie Policy",
    content: `
      <h1>Cookie Policy</h1>
      <p>We use cookies to enhance user experience and analyze website performance. By continuing to use our site, you consent to our cookie policy.</p>
    `,
    crawl: false, // Not valuable for SEO
  },
  {
    id: "privacy-policy",
    slug: "/privacy-policy",
    title: "Privacy Policy",
    content: `
      <h1>Privacy Policy</h1>
      <p>We value your privacy and are committed to protecting your personal information.</p>
    `,
    crawl: false, // Not valuable for SEO
  },
];

export default defaultPages;