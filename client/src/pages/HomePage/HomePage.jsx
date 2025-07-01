// pages/HomePage/HomePage.jsx
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; // Account for fixed navbar
`;

const HeroSection = styled.section`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <div>
          <h1>Welcome to My Portfolio</h1>
          <p>Cybersecurity, Software Development, Web Design, and More</p>
          {/* Add CTA buttons or other content */}
        </div>
      </HeroSection>
      {/* Add more sections as needed */}
    </HomeContainer>
  );
};

export default HomePage;