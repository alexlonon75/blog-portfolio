// components/About/About.styles.js
import styled from 'styled-components';

export const AboutContainer = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export const AboutHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

export const BioSection = styled.div`
  margin: 3rem 0;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

export const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
`;

export const TimelineContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const TimelineItem = styled.div`
  margin: 2rem 0;
  position: relative;
  width: 50%;
  padding: 0 2rem;
  
  &:nth-child(odd) {
    margin-left: auto;
  }
`;

export const EducationCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;