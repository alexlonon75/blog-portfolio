// src/components/About/About.jsx
import styled from 'styled-components';
import { useEffect } from 'react';

const AboutContainer = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const TerminalSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin: 2rem 0;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const TerminalHeader = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: ${({ theme }) => theme.colors.textMuted};

  &:first-child {
    background: ${({ theme }) => theme.colors.surface};
    &:hover { background: #ff4444; }
    &::after { content: '×'; }
  }

  &:nth-child(2) {
    background: ${({ theme }) => theme.colors.surface};
    &:hover { background: #ffaa00; }
    &::after { content: '□'; }
  }

  &:last-child {
    background: ${({ theme }) => theme.colors.surface};
    &:hover { background: #00aa00; }
    &::after { content: '_'; }
  }
`;

const TerminalTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.textSecondary};
  flex: 1;
  text-align: center;
`;

const TerminalContent = styled.div`
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  line-height: 1.8;
`;

const CommandLine = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  &::before {
    content: '> ';
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 0.5rem;
    font-weight: bold;
    flex-shrink: 0;
  }
`;

const CommandOutput = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 1.5rem;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const SkillCategory = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.1rem;

    &::before {
      content: '▶ ';
    }
  }

  ul {
    list-style: none;

    li {
      color: ${({ theme }) => theme.colors.textSecondary};
      margin-bottom: 0.5rem;

      &::before {
        content: '• ';
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const ConnectSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 2rem;
  margin: 3rem 0;
  text-align: center;
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
  }
`;

const ConnectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};

  &::before {
    content: '🤝 ';
    margin-right: 0.5rem;
  }
`;

const ConnectLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const ConnectLink = styled.a`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '${props => props.$icon}';
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }
`;

const About = () => {
  useEffect(() => {
    document.title = 'Alex Lonon | About';
  }, []);

  return (
    <AboutContainer>
      <h1>About Alex Lonon</h1>

      <TerminalSection>
        <TerminalHeader>
          <WindowControls>
            <WindowButton />
            <WindowButton />
            <WindowButton />
          </WindowControls>
          <TerminalTitle>alex@about:~</TerminalTitle>
          <div style={{ width: '60px' }} /> {/* Spacer for centering */}
        </TerminalHeader>
        <TerminalContent>
          <CommandLine>
            <span style={{ color: '#e0e0e0' }}>cat bio.txt</span>
          </CommandLine>
          <CommandOutput>
            <p>
              Senior cybersecurity student at USC Upstate with a passion for building secure,
              scalable applications. Currently developing expertise in digital forensics, network security,
              applied cryptography, and secure software development through hands-on coursework.
            </p>
            <p>
              When I'm not working on cybersecurity projects or coding, you'll find me exploring
              new technologies, running/ enjoying the outdoors, playing video games,and cooking.
            </p>
          </CommandOutput>

          <CommandLine>
            <span style={{ color: '#e0e0e0' }}>ls -la skills/</span>
          </CommandLine>
          <SkillsGrid>
            <SkillCategory>
              <h4>Cybersecurity & AI</h4>
              <ul>
                <li>Digital Forensics</li>
                <li>Network Security</li>
                <li>Computer Security</li>
                <li>Applied Cybersecurity</li>
                <li>Applied Cryptography</li>
                <li>AI & Cybersecurity</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h4>Programming & Development</h4>
              <ul>
                <li>Python Programming</li>
                <li>Visual C# Programming</li>
                <li>Java Programming</li>
                <li>Data Structures & Algorithms</li>
                <li>Software Engineering</li>
                <li>React.js & JavaScript</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h4>Systems & Web Applications</h4>
              <ul>
                <li>Operating Systems</li>
                <li>Computer Networks</li>
                <li>Database System Design</li>
                <li>E-Business Web Application Development</li>
                <li>Computer Organization</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h4>Emerging Tech & Professional Skills</h4>
              <ul>
                <li>Generative AI</li>
                <li>Professional Practices in Information Technology</li>
                <li>Linux (Arch, Kali)</li>
                <li>Discrete Mathematics</li>
                <li>Git & GitHub</li>
              </ul>
            </SkillCategory>
          </SkillsGrid>

          <CommandLine>
            <span style={{ color: '#e0e0e0' }}>cat academic_projects.log</span>
          </CommandLine>
          <CommandOutput>
            <p>
              <strong>Cybersecurity Coursework</strong> - Completing comprehensive cybersecurity program
              including digital forensics investigations, network security analysis, and applied
              cryptography implementations through hands-on lab work and projects.
            </p>
            <p>
              <strong>Software Development Projects</strong> - Building secure web applications using
              modern frameworks like React.js, implementing security best practices, and developing
              portfolio projects that demonstrate both technical and security skills.
            </p>
          </CommandOutput>
        </TerminalContent>
      </TerminalSection>

      <ConnectSection>
        <ConnectTitle>Let's Connect</ConnectTitle>
        <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>
          Interested in collaborating or discussing cybersecurity?
          I'm always open to connecting with fellow professionals.
        </p>
        <ConnectLinks>
          <ConnectLink
            href="https://github.com/alexlonon75"
            target="_blank"
            rel="noopener noreferrer"
            $icon="🔗"
          >
            GitHub
          </ConnectLink>
          <ConnectLink
            href="https://linkedin.com/in/alexlonon"
            target="_blank"
            rel="noopener noreferrer"
            $icon="💼"
          >
            LinkedIn
          </ConnectLink>
          <ConnectLink
            href="mailto:alex@alexlonon.com"
            $icon="📧"
          >
            Email
          </ConnectLink>
        </ConnectLinks>
      </ConnectSection>
    </AboutContainer>
  );
};

export default About;