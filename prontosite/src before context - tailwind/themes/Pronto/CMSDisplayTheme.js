// CMSDisplayTheme.js
import React from "react";
import useThemeContent from "../../CMS/ThemeContentBridge";
import MenuManager from "./Components/Menu/MenuManager"; // Import MenuManager
import HomeHero from "./Components/Sections/Hero/Hero";
import GenericHero from "./Components/Sections/Hero/Hero2";
import About from "./Components/Sections/About/About";
import Services from "./Components/Sections/Services";
import Contact from "./Components/Sections/Contact";
import Testimonials from "./Components/Sections/Testimonials/Testimonials";
import Projects from "./Components/Sections/Projects";
import FAQ from "./Components/Sections/FAQ";
import Header from "./Components/Header/Header";
import Footer from "./Components/Sections/Footer/Footer";
import AboutInfo from "./Components/Sections/About/AboutInfo";
import AboutPurpose from "./Components/Sections/About/AboutPurpose";
import Process from "./Components/Sections/Process/Process";
import WhyChooseUs from "./Components/Sections/About/WhyChooseUs";
import Benefits from "./Components/Sections/About/Benefits";

const sectionComponents = {
  about: About,
  services: Services,
  contact: Contact,
  testimonials: Testimonials,
  projects: Projects,
  faq: FAQ,
  aboutInfo: AboutInfo,
  purpose: AboutPurpose,
  process: Process,
  whyChooseUs: WhyChooseUs,
  benefits: Benefits,
};

const CMSDisplayTheme = ({ pageId }) => {
  const { pageStructure, siteSettings, loading } = useThemeContent(pageId);

  if (loading || !pageStructure) {
    return <p>Loading...</p>;
  }

  // Initialize MenuManager
  const menuManager = new MenuManager(siteSettings);

  const { title, description, sections, slug } = pageStructure;
  console.log("MenuManager instance:", menuManager);

  return (
    <div className={`page-${pageId}`}>
      {/* Pass menuManager to Header */}
      <Header menuManager={menuManager} siteSettings={siteSettings} />

      {pageId === "home" ? (
        <HomeHero data={siteSettings} />
      ) : (
        <GenericHero title={title} description={description} />
      )}

      <div className="page-content"></div>

      {sections
        .filter(({ key }) => key !== "hero") // Exclude 'hero' key
        .map(({ key, data }) => {
          const SectionComponent = sectionComponents[key];
          return SectionComponent ? (
            <SectionComponent key={key} data={data} />
          ) : (
            <p key={key}>Content unavailable for section: {key}</p>
          );
        })}

      {/* Pass menuManager to Footer */}
      <Footer menuManager={menuManager} siteSettings={siteSettings} />
    </div>
  );
};

export default CMSDisplayTheme;