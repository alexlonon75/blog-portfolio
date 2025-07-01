// components/BlogPost/BlogPost.styles.js
import styled from 'styled-components';

export const PostContainer = styled.article`
  margin: 2rem auto;
  padding: 2rem;
  max-width: ${({ theme }) => theme.maxWidth};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const PostHeader = styled.header`
  margin-bottom: 2rem;
`;

export const PostTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const PostContent = styled.div`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h3 {
    margin: 2rem 0 1rem;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;