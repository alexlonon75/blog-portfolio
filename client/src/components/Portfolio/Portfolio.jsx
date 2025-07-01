// src/components/Portfolio/Portfolio.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ProjectCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.accent}
    );
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &::before {
      opacity: 1;
    }
  }
`;

const ProjectLink = styled(Link)`
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 1rem 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const ProjectTitle = styled.h3`
  margin: 0.5rem 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '# ';
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechnologiesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;

  span {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textInverse};
    }
  }
`;

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Automated Security Monitoring Dashboard",
      description: "To follow the creation of this portfolio site, I decided to use my skills in n8n to create an automated way to know if my site ever goes down. I created a workflow that triggers every 5 minutes, sending a GET request to my frontend. I then process this in a js code node to extract the status code and response time. This data is then sent to my database in MongoDB, and if the parameters do not meet the satisfactory conditions, a discord message is sent alerting me.",
      image: "/security-dashboard.png",
      technologies: ["N8N", "Javascript", "HTTP Requests", "MongoDB", "APIs"],
      preview: "Real-time monitoring system with automated alerts and dashboard visualization. Built with n8n workflows, MongoDB storage, and Discord notifications for comprehensive website uptime monitoring.",
      status: "Active",
      dateCreated: "2024",
      category: "Security & Monitoring"
    }
    // Add more projects here
  ];

  return (
    <PortfolioGrid>
      {projects.map(project => (
        <ProjectCard key={project.id}>
          <ProjectLink to={`/project/${project.id}`}>
            <ProjectTitle>{project.title}</ProjectTitle>

            {project.image && <ProjectImage src={project.image} alt={project.title} />}

            <TechnologiesContainer>
              {project.technologies.map(tech => (
                <span key={tech}>#{tech}</span>
              ))}
            </TechnologiesContainer>

            <ProjectDescription>
              {project.preview || project.description.substring(0, 150)}...
            </ProjectDescription>
          </ProjectLink>
        </ProjectCard>
      ))}
    </PortfolioGrid>
  );
};

export default Portfolio;