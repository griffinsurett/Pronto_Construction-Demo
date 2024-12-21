// Content.js
import processDynamicContent from "./Utils/DynamicContent/DynamicContentUtils";
import defaultPages from "./DefaultPages";
import { processHomepage } from "./Utils/StaticPages/HomepageUtils";
import RelationalUtil from "./Utils/Relationships/RelationsUtil";
import { setLogo } from "./Utils/SEO/SetLogo";
import { generateQueries } from "./Queries"; // Import menu generation logic
import { getIcon } from "./Utils/Icons/IconImporter";

const Logo = `${process.env.PUBLIC_URL}/transparent-bg-pronto.png`;

// Site Settings
const siteSettings = {
  siteTitle: "Pronto Construction and Demolition",
  siteTagline: "Serving Middlesex County, NJ and More",
  siteDescription:
    "Providing expert construction, renovation, and demolition services to Middlesex County and beyond, ensuring quality and reliability at every step.",
  siteLogo: Logo,
  siteCompany: "Pronto Construction and Demolition",
  businessOwner: "Anthony Gonzalez",
  ownerDateOfBirth: "2004-12-30",
  BusinessName: "Pronto Construction LLC",
  CTAButton: "Get Quote",
  CTALink: "/contact-us",
  get Copyright() {
    const currentYear = new Date().getFullYear();
    return `Copyright © ${currentYear} ${this.BusinessName}`;
  },
  get ownerAge() {
    const today = new Date();
    const birthDate = new Date(this.ownerDateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age;
  },
  keywords: [
    "construction services",
    "renovation experts",
    "demolition services",
    "Middlesex County construction",
    "NJ construction company",
    "home improvement",
    "commercial construction",
    "licensed contractors",
    "building demolition NJ",
    "renovation Middlesex County",
  ],
};

// Collections
const collections = [
  {
    id: 1,
    collection: "about",
    heading: "Who We Are",
    title: "About Us",
    featuredImage: Logo,
    // Note: This collection has no sub-items object, so we omit 'items' here.
    // If you'd like sub-items in the future, just add an 'items' object.
    addToQuery: [
      { name: "Primary", parentQueryItem: null, queryItemText: "heading" },
    ],
    hasPage: true,
    slug: "/about-us",
    sections: ["hero", "about", "purpose", "whyChooseUs", "aboutInfo", "benefits"],
    redirectFrom: ["/about"],
    paragraph:
      "At Pronto Construction and Demolition, we specialize in delivering high-quality renovation, construction, and demolition services.",
    purpose: {
      makeObjectSection: true,
      title: "Our Purpose",
      heading: "Mission and Vision",
      description: "Guided by principles of trust and excellence.",
      items: [
        {
          title: "Mission",
          description: "Provide reliable and efficient construction services.",
        },
        {
          title: "Vision",
          description: "Become the most trusted construction company.",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Us?",
      heading: `Why Choose ${siteSettings.siteTitle}?`,
      makeObjectSection: true,
      items: [
        {
          title: "Satisfaction Guarantee",
          icon: getIcon("fa", "Ribbon"),
          description: "We guarantee your satisfaction.",
        },
        {
          title: "Quick and Efficient",
          icon: getIcon("fa", "Truck"),
          description: "Efficient services with minimal disruption.",
        },
      ],
    },
    keywords: [
      "about Pronto Construction",
      "NJ renovation company",
      "construction expertise",
      "Middlesex County contractors",
      "trustworthy construction services",
    ],
    benefits: {
      makeObjectSection: true,
      title: "Benefits",
      heading: "Our Key Benefits",
      items: [
        {
          title: "Satisfaction Guarantee",
          icon: getIcon("fa", "Ribbon"),
          description: "We guarantee your satisfaction.",
        },
        {
          title: "Quick and Efficient",
          icon: getIcon("fa", "Truck"),
          description: "Efficient services with minimal disruption.",
        },
      ],
    },
    aboutInfo: {
      makeObjectSection: true,
      title: "About Us in Detail",
      heading: "Who We Are",
      items: [
        {
          title: "Who We Are",
          heading: "Founded By Teens on a Mission for Success...",
          description: "Founded in 2022...",
        },
        {
          title: "What We Do",
          description: "We specialize in construction, renovation...",
        },
      ],
    },
  },
  {
    id: 10,
    collection: "contact",
    heading: "Contact Us.",
    title: "Contact Us",
    featuredImage: Logo,
    paragraph: `Discover answers to common questions about ${siteSettings.siteTitle}.`,
    hasPage: true,
    slug: "/contact-us",
    addToQuery: [{ name: "Primary", parentQueryItem: null }],
    sections: ["hero", "contact"],
    redirectFrom: ["/contact"],
    contactInfo: [
      {
        icon: getIcon("fa", "Phone"),
        label: "Phone",
        value: "(732) 939-1309",
        get href() {
          return `tel:${this.value.replace(/\D/g, "")}`; // Removes non-numeric characters
        },
      },
      {
        icon: getIcon("fa", "Envelope"),
        label: "Email",
        value: "prontonj@gmail.com",
        get href() {
          return `mailto:${this.value}`;
        },
      },
    ],
    socialMedia: [
      {
        platform: "Facebook",
        href: "https://facebook.com/griffinswebservices",
        icon: getIcon("fab", "Facebook"),
      },
      {
        platform: "X",
        href: "https://twitter.com/griffinswebservices",
        icon: getIcon("fab", "XTwitter"),
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/company/griffins-web-services",
        icon: getIcon("fab", "Linkedin"),
      },
      {
        platform: "Instagram",
        href: "https://instagram.com/griffinswebservices",
        icon: getIcon("fab", "Instagram"),
      },
    ],
  },
  {
    id: 3,
    collection: "services",
    heading: "What We Do",
    title: "Services",
    featuredImage: Logo,
    hasPage: true,
    slug: "/services",
    onlyParentsOnCollection: true, 
    redirectFrom: ["/service"],
    sections: ["hero", "services", "benefits", "projects", "testimonials"],
     addToQuery: [
      {
        name: "Primary",
        parentQueryItem: null,
        queryItemText: "heading",
        addItemsToQuery: true,
        setChildrenUnderParents: true,
        excludeCollection: false,
      },
    ],
    items: {
      isHeirarchical: true,
      itemsHasPage: true,
      includeCollectionSlug: false,
      itemSections: ["hero", "projects", "services", "testimonials", "faq"],
      onlyParentItemsHasPage: true,
      paragraph: "Explore our wide range of services designed to meet your needs.",
      keywords: [
        "construction services",
        "general contractors",
        "home construction",
        "commercial construction NJ",
      ],
      data: [
        {
          icon: getIcon("fa", "Tools"),
          title: "Construction",
          slug: "/construction",
          description: "Comprehensive construction services for all your needs.",
          sections: ["hero", "services", "projects", "testimonials", "faq"],
        },
        {
          icon: getIcon("fa", "Hammer"),
          title: "Demolition",
          slug: "/demolition",
          description: "Efficient and safe demolition services.",
          sections: ["hero", "services", "projects", "testimonials", "faq"],
        },
        {
          icon: getIcon("fa", "HardHat"),
          title: "Roofing",
          slug: "/roofing",
          parentItem: "/construction",
          description: "Professional roofing services to keep your home protected.",
        },
        {
          icon: getIcon("fa", "PaintRoller"),
          title: "Painting",
          slug: "/painting",
          parentItem: "/construction",
          description: "High-quality painting services to transform your space.",
        },
        {
          icon: getIcon("fa", "Truck"),
          title: "Garage Demolition",
          slug: "/garage-demolition",
          parentItem: "/demolition",
          description: "Efficient garage demolition services.",
        },
      ],
    },
  },
  {
    id: 4,
    collection: "projects",
    heading: "Our Projects",
    title: "Projects",
    featuredImage: Logo,
    hasPage: true,
    slug: "/projects",
    sections: ["hero", "projects", "services", "testimonials"],
    addToQuery: [{ name: "Primary", parentQueryItem: "/about-us" }],
    items: {
      itemsHasPage: true,
      itemSections: ["hero", "projects", "services", "testimonials"],
      data: [
        {
          id: 1,
          title: "Residential Kitchen Remodel",
          description:
            "A complete renovation of a family kitchen to modern standards.",
          slug: "/kitchen-remodel",
          featuredImage: Logo,
        },
        {
          id: 2,
          title: "Garage Demolition",
          description: "Efficiently demolished a medium-sized garage structure.",
          slug: "/garage-demolition-in-nj",
          featuredImage: Logo,
        },
      ],
    },
  },
  {
    id: 5,
    collection: "testimonials",
    heading: "What Our Clients Say",
    title: "Testimonials",
    hasPage: true,
    featuredImage: Logo,
    addToQuery: [{ name: "Primary", parentQueryItem: "/about-us" }],
    slug: "/testimonials",
    sections: ["hero", "testimonials"],
    items: {
      data: [
        {
          name: "John Doe",
          quote:
            "Pronto Construction did an amazing job with our home renovation. Highly recommend!",
          position: "Homeowner, Middlesex County",
          featuredImage: Logo,
        },
        {
          name: "Jane Smith",
          quote:
            "Their demolition services were efficient and thorough. Very professional team.",
          position: "Business Owner, NJ",
          featuredImage: Logo,
        },
      ],
    },
  },
  {
    id: 6,
    collection: "faq",
    heading: "Frequently Asked Questions",
    title: "FAQ",
    hasPage: false,
    featuredImage: Logo,
    addToQuery: [{ name: "Primary", parentQueryItem: "/about-us" }],
    slug: "/faq",
    sections: ["hero", "faq"],
    redirectFrom: ["/questions"],
    items: {
      data: [
        {
          title: "What services do you offer?",
          description:
            "We offer a wide range of construction, renovation, and demolition services. From kitchen remodeling to complete building demolition, we have the expertise to handle any project.",
        },
        {
          title: "How long have you been in business?",
          description:
            "Pronto Construction and Demolition has been serving Middlesex County and surrounding areas for over 10 years. Our team brings a wealth of experience and expertise to every project.",
        },
        {
          title: "Do you provide free estimates?",
          description:
            "Yes, we offer free estimates for all our services. Contact us to discuss your project and receive a detailed estimate tailored to your needs.",
        },
        {
          title: "Are you licensed and insured?",
          description:
            "Yes, we are fully licensed and insured to provide construction, renovation, and demolition services in Middlesex County and beyond. Our team adheres to all safety regulations and industry standards.",
        },
        {
          title: "What areas do you serve?",
          description:
            "We proudly serve Middlesex County, NJ, and surrounding areas. Contact us to discuss your project and learn more about our service area.",
        },
      ],
    },
  },
  {
    id: 7,
    collection: "process",
    heading: "How We Do It",
    title: "Process",
    featuredImage: Logo,
    hasPage: true,
    slug: "/process",
    sections: ["hero", "process", "contact"],
    addToQuery: [
      {
        name: "Primary",
        parentQueryItem: null,
        queryItemText: "heading",
      },
    ],
    paragraph:
      "Discover how Pronto Construction & Demolition simplifies your project from start to finish.",
    items: {
      // Not hierarchical; just a data array
      data: [
        {
          id: 1,
          name: "Consultation & Planning",
          description:
            "We start by understanding your needs and creating a customized plan for your project.",
          featuredImage: Logo,
        },
        {
          id: 2,
          name: "Transparent Quoting",
          description:
            "Receive a detailed, upfront quote with no hidden fees or surprises.",
          featuredImage: Logo,
        },
        {
          id: 3,
          name: "Expert Execution",
          description:
            "Our skilled team brings your vision to life while prioritizing safety and precision.",
          featuredImage: Logo,
        },
        {
          id: 4,
          name: "Cleanup & Final Touches",
          description:
            "We leave your site spotless and ready for its next phase.",
          featuredImage: Logo,
        },
      ],
    },
  },
];

const homepageOverride = {
  title: `${siteSettings.siteTagline}`,
  description: `${siteSettings.siteDescription}`,
  featuredImage: Logo,
  sections: [
    "hero",
    "about",
    "process",
    "benefits",
    "whyChooseUs",
    "services",
    "projects",
    "testimonials",
    "contact",
    "faq",
  ],
};

// Process Pages
const pages = processHomepage(defaultPages, homepageOverride);
// Process collections to generate slugs and pages
const { processedCollections, processedPages } = processDynamicContent({
  pages,
  collections,
});

// Add relationships
const relationalUtil = new RelationalUtil({
  collections: processedCollections,
});

// Define relationships
relationalUtil.relate("services", "/construction", "projects", "/kitchen-remodel");
relationalUtil.relate("services", "/painting", "projects", "/kitchen-remodel");
relationalUtil.relate("projects", "/kitchen-remodel", "testimonials", "/john-doe");
// relationalUtil.relate("services", "/demolition", "projects", "/garage-demolition");
relationalUtil.relate("services", "/painting", "projects", "/garage-demolition-in-nj");
// relationalUtil.relate("projects", "/garage-demolition", "testimonials", "/jane-smith");
relationalUtil.relate("services", "/construction", "faq", 2);

setLogo(siteSettings.siteLogo);

// Export menus along with the rest of the content
const Content = {
  siteSettings,
  collections: processedCollections,
  pages: processedPages,
  queries: generateQueries(processedCollections, siteSettings),
};

export default Content;
