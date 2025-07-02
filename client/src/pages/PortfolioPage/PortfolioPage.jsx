// pages/PortfolioPage/PortfolioPage.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Portfolio from '../../components/Portfolio/Portfolio';
import PageContainer from '../../components/common/PageContainer';
import PageHeader from '../../components/common/PageHeader';
import { api } from '../../services/api';

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};

  &::before {
    content: 'Loading';
    animation: dots 1.5s infinite;
  }

  @keyframes dots {
    0%, 20% { content: 'Loading'; }
    40% { content: 'Loading.'; }
    60% { content: 'Loading..'; }
    80%, 100% { content: 'Loading...'; }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 8px;
  margin: 2rem 0;

  &::before {
    content: '❌ ';
  }
`;

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Alex Lonon | Portfolio';
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PageContainer>
      <PageHeader title="My Work" />
      {isLoading ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage>Error loading projects: {error}</ErrorMessage>
      ) : projects.length === 0 ? (
        <ErrorMessage>No projects found.</ErrorMessage>
      ) : (
        <Portfolio projects={projects} />
      )}
    </PageContainer>
  );
};

export default PortfolioPage;