// src/components/About/About.jsx
import styled from 'styled-components';

const AboutContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BioSection = styled.div`
  margin: 2rem 0;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const About = () => {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "CSS/SCSS"
    // Add more skills
  ];

  return (
    <AboutContainer>
      <h1>About Me</h1>
      
      <BioSection>
        <h2>My Journey</h2>
        <p>Your professional journey and background...</p>
      </BioSection>

      <BioSection>
        <h2>Skills</h2>
        <SkillsGrid>
          {skills.map(skill => (
            <div key={skill}>{skill}</div>
          ))}
        </SkillsGrid>
      </BioSection>

      <BioSection>
        <h2>Experience</h2>
        {/* Add your work experience */}
      </BioSection>

      <BioSection>
        <h2>Education</h2>
        {/* Add your education details */}
      </BioSection>
    </AboutContainer>
  );
};

export default About;