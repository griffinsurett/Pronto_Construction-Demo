// Projects.js
import React from "react";
import ContentTemplate from "../ContentTemplate";
import { Link } from "react-router-dom";
import { getItemData } from "../../GetItems"; // NEW import

const Projects = ({ data }) => {
  const items = getItemData(data);

  return (
    <ContentTemplate data={data} sectionButtonText="View All Projects">
      <div className="projects-list">
        {items.map((project) => (
          <div key={project.slug} className="project-item">
            <img
              src={project.featuredImage}
              alt={project.name || project.title}
            />
            <h3>{project.name || project.title}</h3>
            <p>{project.description}</p>
            {project.slug ? (
              <Link to={project.slug} className="project-link">
                  {`View Project`}
                  </Link>
            ) : (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Visit Site
              </a>
            )}
          </div>
        ))}
      </div>
    </ContentTemplate>
  );
};

export default Projects;
