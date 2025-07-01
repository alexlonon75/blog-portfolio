// src/components/Portfolio/Portfolio.jsx
import styled from 'styled-components';

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ProjectCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "Description of project 1",
      image: "/path-to-image",
      technologies: ["React", "Node.js"],
      link: "https://alexlonon.com"
    }
    // Add more projects
  ];

  return (
    <PortfolioGrid>
      {projects.map(project => (
        <ProjectCard key={project.id}>
          <img src={project.image} alt={project.title} />
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div>
              {project.technologies.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <a href={project.link}>View Project</a>
          </div>
        </ProjectCard>
      ))}
    </PortfolioGrid>
  );
};

export default Portfolio;