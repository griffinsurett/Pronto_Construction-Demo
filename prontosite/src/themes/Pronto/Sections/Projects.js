// Projects.js
import React from "react";
import Section from "../Components/Section"; // Adjust the import path as necessary
import ContentTemplate from "../Components/ContentTemplate";
import { Link } from "react-router-dom";
import { getItemData } from "../GetItems"; // NEW import
import PropTypes from "prop-types";

const Projects = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="projects">
      <ContentTemplate data={data} sectionButtonText="View All Projects">
        <div>
          {items.map((project) => (
            <div key={project.slug}>
              {project.featuredImage && (
                <img
                  src={project.featuredImage}
                  alt={project.name || project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div>
                <h3>{project.name || project.title}</h3>
                <p>{project.description}</p>
                {project.slug ? (
                  <Link
                    to={project.slug}
                    className="hover:underline"
                  >
                    View Project
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Visit Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </ContentTemplate>
    </Section>
  );
};

Projects.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Projects;