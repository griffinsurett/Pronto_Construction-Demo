// CMSDisplayTheme.js
import React from "react";
import useThemeContent from "../../CMS/ThemeContentBridge";
import MenuManager from "./Components/Menu/MenuManager"; // Import MenuManager
import HomeHero from "./Sections/Hero/Hero";
import GenericHero from "./Sections/Hero/Hero2";
import About from "./Sections/About/About";
import Services from "./Sections/Services";
import Contact from "./Sections/Contact";
import Testimonials from "./Sections/Testimonials/Testimonials";
import Projects from "./Sections/Projects";
import FAQ from "./Sections/FAQ";
import Header from "./Sections/Header/Header";
import Footer from "./Sections/Footer";
import AboutInfo from "./Sections/About/AboutInfo";
import AboutPurpose from "./Sections/About/AboutPurpose";
import Process from "./Sections/Process";
import WhyChooseUs from "./Sections/About/WhyChooseUs";
import Benefits from "./Sections/About/Benefits";

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
    <div className="flex flex-col min-h-screen">
      {/* Pass menuManager to Header */}
      <Header menuManager={menuManager} siteSettings={siteSettings} />

      {pageId === "home" ? (
        <HomeHero data={siteSettings} />
      ) : (
        <GenericHero title={title} description={description} />
      )}

      <main className="flex-grow">
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
      </main>

      {/* Pass menuManager to Footer */}
      <Footer menuManager={menuManager} siteSettings={siteSettings} />
    </div>
  );
};

export default CMSDisplayTheme;
