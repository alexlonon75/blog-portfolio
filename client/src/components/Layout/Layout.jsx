// components/Layout/Layout.jsx
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styled from 'styled-components';

const Main = styled.main`
  min-height: 100vh;
  padding-top: 80px; // Height of the navbar
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;