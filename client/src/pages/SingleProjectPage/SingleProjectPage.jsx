// src/pages/SingleProjectPage/SingleProjectPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../../services/api';

const ProjectContainer = styled.article`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  min-height: 100vh;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '← ';
    margin-right: 0.5rem;
  }
`;

const ProjectTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-size: 2.5rem;

  &::before {
    content: '# ';
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 2rem 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const TechnologiesContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1.5rem 0;

  span {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 0.9rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textInverse};
    }

    &::before {
      content: '#';
      margin-right: 0.25rem;
    }
  }
`;

const ProjectContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin: 2rem 0;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2, h3 {
    margin: 2rem 0 1rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  h2::before {
    content: '## ';
    color: ${({ theme }) => theme.colors.primary};
  }

  h3::before {
    content: '### ';
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const ProjectLink = styled.a`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  text-decoration: none;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.error || '#ff6b6b'};
  font-family: ${({ theme }) => theme.fonts.primary};
`;



function SingleProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const projectData = await api.getProject(id);
        setProject(projectData);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project && project.title) {
      document.title = `Alex Lonon | ${project.title}`;
    } else {
      document.title = 'Alex Lonon | Project';
    }
  }, [project]);

  if (isLoading) return (
    <ProjectContainer>
      <LoadingMessage>Loading project details...</LoadingMessage>
    </ProjectContainer>
  );
  
  if (error) return (
    <ProjectContainer>
      <BackButton onClick={() => navigate(-1)}>Back to Portfolio</BackButton>
      <ErrorMessage>Error: {error}</ErrorMessage>
    </ProjectContainer>
  );
  
  if (!project) return (
    <ProjectContainer>
      <BackButton onClick={() => navigate(-1)}>Back to Portfolio</BackButton>
      <ErrorMessage>Project not found</ErrorMessage>
    </ProjectContainer>
  );

  return (
    <ProjectContainer>
      <BackButton onClick={() => navigate(-1)}>Back to Portfolio</BackButton>
      
      <ProjectTitle>{project.title}</ProjectTitle>
      
      {project.imageUrl && <ProjectImage src={project.imageUrl} alt={project.title} />}
      
      <ProjectMeta>
        <div>
          <strong>Status:</strong> {project.status}
        </div>
        <div>
          <strong>Year:</strong> {project.dateCreated}
        </div>
      </ProjectMeta>

      <TechnologiesContainer>
        {project.technologies.map(tech => (
          <span key={tech}>{tech}</span>
        ))}
      </TechnologiesContainer>

      <ProjectContent>
        {project.fullContent ? (
          project.fullContent.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return <h2 key={index}>{line.replace('## ', '')}</h2>;
            } else if (line.startsWith('### ')) {
              return <h3 key={index}>{line.replace('### ', '')}</h3>;
            } else if (line.trim() === '') {
              return <br key={index} />;
            } else {
              return <p key={index}>{line}</p>;
            }
          })
        ) : (
          <p>{project.description}</p>
        )}
      </ProjectContent>

      {project.links && project.links.length > 0 && (
        <ProjectLinks>
          {project.links.map((link, index) => (
            <ProjectLink key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </ProjectLink>
          ))}
        </ProjectLinks>
      )}
    </ProjectContainer>
  );
}

export default SingleProjectPage;
