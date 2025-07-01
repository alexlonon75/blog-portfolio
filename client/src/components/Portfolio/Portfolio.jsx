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
      title: "Automated Security Monitoring Dashboard",
      description: "To follow the creation of this portfolio site, I decided to use my skills in n8n to create an automated way to know if my site ever goes down. I created a workflow that triggers every 5 minutes, sending a GET request to my frontend. I then process this in a js code node to extract the satuts code and response time. This data is then sent to my database in MongoDB, and if the parameters do not meet the satisfactory conditions, a discord message is sent alerting me.",
      image: "/security-dashboard.png",
      technologies: ["N8N", "Javascript", "HTTP Requests", "MongoDB", "APIs"],
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