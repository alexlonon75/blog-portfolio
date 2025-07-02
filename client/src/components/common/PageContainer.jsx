// components/common/PageContainer.jsx
import styled from 'styled-components';

const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const PageContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;
