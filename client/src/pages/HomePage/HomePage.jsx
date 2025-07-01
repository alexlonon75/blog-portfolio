// pages/HomePage/HomePage.jsx
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  0%, 50% { border-color: transparent; }
  51%, 100% { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const TerminalWindow = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  overflow: hidden;
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

const TerminalLine = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '${props => props.prompt || ">"}';
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

const TypedText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  animation: ${typewriter} 3s steps(40) 1s forwards,
             ${blink} 1s infinite;
  width: 0;
`;

const CommandOutput = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.textInverse : theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.primaryDark : theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-1px);
  }
`;

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HomeContainer>
      <TerminalWindow>
        <TerminalHeader>
          <WindowControls>
            <WindowButton />
            <WindowButton />
            <WindowButton />
          </WindowControls>
          <TerminalTitle>alex@portfolio:~</TerminalTitle>
          <div style={{ width: '60px' }} /> {/* Spacer for centering */}
        </TerminalHeader>
        <TerminalContent>
          <TerminalLine prompt=">">
            <TypedText>whoami</TypedText>
          </TerminalLine>

          {showContent && (
            <>
              <CommandOutput>
                Alex Lonon - Cybersecurity Student & Life-Long Learner
              </CommandOutput>

              <TerminalLine prompt=">">
                <span style={{ color: '#e0e0e0' }}>cat skills.txt</span>
              </TerminalLine>

              <SkillsGrid>
                <SkillCard>
                  <h3>🔒 Cybersecurity</h3>
                  <p>Penetration Testing, Vulnerability Assessment, Security Architecture</p>
                </SkillCard>
                <SkillCard>
                  <h3>💻 Development</h3>
                  <p>Full-Stack Web Development, React, Node.js, Python</p>
                </SkillCard>
                <SkillCard>
                  <h3>🎨 Design</h3>
                  <p>UI/UX Design, Responsive Web Design, User Experience</p>
                </SkillCard>
                <SkillCard>
                  <h3>☁️ Cloud & DevOps</h3>
                  <p>AWS, Docker, CI/CD, Infrastructure as Code</p>
                </SkillCard>
              </SkillsGrid>

              <TerminalLine prompt=">">
                <span style={{ color: '#e0e0e0' }}>ls -la projects/</span>
              </TerminalLine>

              <CTAButtons>
                <CTAButton to="/portfolio" $variant="primary">
                  ./view_portfolio.sh
                </CTAButton>
                <CTAButton to="/blog">
                  ./read_blog.sh
                </CTAButton>
                <CTAButton to="/about">
                  ./about_me.sh
                </CTAButton>
              </CTAButtons>
            </>
          )}
        </TerminalContent>
      </TerminalWindow>
    </HomeContainer>
  );
};

export default HomePage;