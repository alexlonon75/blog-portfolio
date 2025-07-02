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

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default Layout;