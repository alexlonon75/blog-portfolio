// components/common/Loading.jsx
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Loading = () => (
  <LoadingContainer>
    <div>Loading...</div>
  </LoadingContainer>
);

export default Loading;