// src/components/Footer/Footer.jsx
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <div>
          <h3>About Me</h3>
          <p>Brief description about yourself</p>
        </div>
        
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h3>Connect</h3>
          <div>
            <ul>
              <li><a href="https://github.com/yourusername">GitHub</a></li>
              <li><a href="https://linkedin.com/in/yourusername">LinkedIn</a></li>
              <li><a href="https://twitter.com/yourusername">Twitter</a></li>
            </ul>
          </div>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;