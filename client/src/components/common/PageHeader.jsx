// components/common/PageHeader.jsx
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.5rem;
  margin: 0;

  &::before {
    content: '> ';
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PageHeader = ({ title, children }) => {
  return (
    <HeaderContainer>
      <PageTitle>{title}</PageTitle>
      {children}
    </HeaderContainer>
  );
};

export default PageHeader;
