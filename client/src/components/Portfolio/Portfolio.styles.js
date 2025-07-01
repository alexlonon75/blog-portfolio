// components/Portfolio/Portfolio.styles.js
import styled from 'styled-components';

export const PortfolioContainer = styled.section`
  padding: 2rem;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

export const ProjectCard = styled.article`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

export const ProjectTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1rem;
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;