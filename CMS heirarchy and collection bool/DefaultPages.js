const defaultPages = [
  {
    id: "home",
    slug: "/",
    title: "Home",
  },
  {
    id: "error",
    slug: "/error",
    title: "Page Not Found",
    content: "Oops! The page you're looking for doesn't exist.",
  },
  {
    id: "cookie-policy",
    slug: "/cookie-policy",
    title: "Cookie Policy",
    content: `
      <h1>Cookie Policy</h1>
      <p>At Griffin's Web Services, we use cookies to enhance user experience and analyze website performance. By continuing to use our site, you consent to our cookie policy.</p>
    `,
  },
  {
    id: "privacy-policy",
    slug: "/privacy-policy",
    title: "Privacy Policy",
    content: `
      <h1>Privacy Policy</h1>
      <p>We value your privacy and are committed to protecting your personal information. This page outlines how we collect, use, and protect your data.</p>
    `,
  },
];

export default defaultPages;
