// components/Footer/Footer.jsx
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;

  &::before {
    content: '${props => props.$icon}';
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.small};
    transform: translateY(-1px);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          <SocialLink
            href="https://github.com/alexlonon75"
            target="_blank"
            rel="noopener noreferrer"
            $icon="🔗"
          >
            GitHub
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/alexlonon"
            target="_blank"
            rel="noopener noreferrer"
            $icon="💼"
          >
            LinkedIn
          </SocialLink>
          <SocialLink
            href="https://mastodon.social/@alexlonon"
            target="_blank"
            rel="noopener noreferrer"
            $icon="🐘"
          >
            Mastodon
          </SocialLink>
          <SocialLink
            href="mailto:alex@alexlonon.com"
            $icon="📧"
          >
            Email
          </SocialLink>
          <SocialLink
            href="/resume.pdf"
            target="_blank"
            $icon="📄"
          >
            Resume
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;