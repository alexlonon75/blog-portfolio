// src/components/About/About.jsx
import styled from 'styled-components';

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
`;

const TerminalHeader = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5f56;
    box-shadow: 20px 0 #ffbd2e, 40px 0 #27ca3f;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: 1rem;
  }
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
  return (
    <AboutContainer>
      <h1>About Alex Lonon</h1>

      <TerminalSection>
        <TerminalHeader>
          <span>alex@about:~</span>
        </TerminalHeader>
        <TerminalContent>
          <CommandLine>
            <span style={{ color: '#e0e0e0' }}>cat bio.txt</span>
          </CommandLine>
          <CommandOutput>
            <p>
              Cybersecurity professional and full-stack developer with a passion for building secure,
              scalable applications. I specialize in penetration testing, vulnerability assessment,
              and developing robust web solutions.
            </p>
            <p>
              When I'm not hunting for vulnerabilities or writing code, you'll find me exploring
              new technologies, contributing to open source projects, and sharing knowledge
              through technical writing.
            </p>
          </CommandOutput>

          <CommandLine>
            <span style={{ color: '#e0e0e0' }}>ls -la skills/</span>
          </CommandLine>
          <SkillsGrid>
            <SkillCategory>
              <h4>Security</h4>
              <ul>
                <li>Penetration Testing</li>
                <li>Vulnerability Assessment</li>
                <li>Security Architecture</li>
                <li>Incident Response</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h4>Development</h4>
              <ul>
                <li>JavaScript/TypeScript</li>
                <li>React & Node.js</li>
                <li>Python</li>
                <li>MongoDB & SQL</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h4>DevOps & Cloud</h4>
              <ul>
                <li>AWS/Azure</li>
                <li>Docker & Kubernetes</li>
                <li>CI/CD Pipelines</li>
                <li>Infrastructure as Code</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h4>Tools & Frameworks</h4>
              <ul>
                <li>Burp Suite</li>
                <li>Metasploit</li>
                <li>Git & GitHub</li>
                <li>Linux Administration</li>
              </ul>
            </SkillCategory>
          </SkillsGrid>

          <CommandLine>
            <span style={{ color: '#e0e0e0' }}>cat experience.log</span>
          </CommandLine>
          <CommandOutput>
            <p>
              <strong>Senior Security Analyst</strong> - Building secure systems and conducting
              comprehensive security assessments for enterprise clients.
            </p>
            <p>
              <strong>Full-Stack Developer</strong> - Developing modern web applications with
              a focus on security best practices and user experience.
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