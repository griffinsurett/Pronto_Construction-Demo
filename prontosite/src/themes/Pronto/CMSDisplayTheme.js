// CMSDisplayTheme.js
import React from "react";
import useThemeContent from "../../CMS/ThemeContentBridge";
import HomeHero from "./Components/Section/Hero/Hero";
import GenericHero from "./Components/Section/Hero/Hero2";
import About from "./Components/Section/About/About";
import Services from "./Components/Section/Services";
import Contact from "./Components/Section/Contact";
import Testimonials from "./Components/Section/Testimonials/Testimonials";
import Projects from "./Components/Section/Projects";
import FAQ from "./Components/Section/FAQ";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AboutInfo from "./Components/Section/About/AboutInfo";
import AboutPurpose from "./Components/Section/About/AboutPurpose";
import Process from "./Components/Section/Process/Process";
import WhyChooseUs from "./Components/Section/About/WhyChooseUs";
import Benefits from "./Components/Section/About/Benefits";

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

// console.log(sectionComponents);

const CMSDisplayTheme = ({ pageId }) => {
  const { pageStructure, siteSettings, loading } = useThemeContent(pageId);

  if (loading || !pageStructure) {
    return <p>Loading...</p>;
  }

  const { title, description, content, sections, slug } = pageStructure;

  return (
    <div className={`page-${pageId}`}>
      <Header siteSettings={siteSettings} />
      {pageId === "home" ? (
        <HomeHero data={siteSettings} />
      ) : (
        <GenericHero title={title} description={description} />
      )}
      <div className="page-content">
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
      {
   sections.map(({ key, data }) => {
    // console.log(`Rendering section: ${key}`, data); // Debug each section
    const SectionComponent = sectionComponents[key];
  
    return SectionComponent ? (
      <SectionComponent key={key} data={data} />
    ) : null;
  })  
      }
      <Footer siteSettings={siteSettings} />
    </div>
  );
};

export default CMSDisplayTheme;
