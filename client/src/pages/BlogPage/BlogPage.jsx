// pages/BlogPage/BlogPage.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BlogPost from '../../components/BlogPost/BlogPost';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const BlogContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;

  h1 {
    text-align: center;
    margin-bottom: 3rem;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.text};
    font-size: 2.5rem;

    &::before {
      content: '> ';
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};

  &::before {
    content: 'Loading';
    animation: dots 1.5s infinite;
  }

  @keyframes dots {
    0%, 20% { content: 'Loading'; }
    40% { content: 'Loading.'; }
    60% { content: 'Loading..'; }
    80%, 100% { content: 'Loading...'; }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 8px;
  margin: 2rem 0;

  &::before {
    content: '❌ ';
  }
`;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Fixed typo in isLoading
  const [error, setError] = useState(null);  // Added error state

  useEffect(() => {
    document.title = 'Alex Lonon | Blog';
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        console.log('API_URL being used:', API_URL);
        console.log('Full URL being fetched:', `${API_URL}/api/posts`);
        console.log('Environment:', process.env.NODE_ENV);
        console.log('REACT_APP_API_URL from env:', process.env.REACT_APP_API_URL);
        const response = await fetch(`${API_URL}/api/posts`);
        console.log('Response:', response);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Received data:', data);
          setPosts(data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Debug logging
  console.log('Component rendering with posts:', posts);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  return (
    <BlogContainer>
      <h1>Blog Posts</h1>
      {isLoading ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : posts.length > 0 ? (
        posts.map(post => (
          <BlogPost key={post._id || post.id} post={post} />
        ))
      ) : (
        <ErrorMessage>No posts found. Please check if the backend server is running.</ErrorMessage>
      )}
    </BlogContainer>
  );
};

export default BlogPage;