// src/pages/SinglePostPage/SinglePostPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';
import { getImageUrl } from '../../utils/imageUtils';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PostContainer = styled.article`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const PostImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem 0;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '← ';
    margin-right: 0.5rem;
  }
`;

function SinglePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        console.log('SinglePost API_URL:', API_URL);
        console.log('Fetching post URL:', `${API_URL}/api/posts/${id}`);
        const response = await fetch(`${API_URL}/api/posts/${id}`);

        if (!response.ok) {
          throw new Error('Post not found');
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.title) {
      document.title = `Alex Lonon | ${post.title}`;
    } else {
      document.title = 'Alex Lonon | Blog Post';
    }
  }, [post]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return (
    <PostContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <div>Error: {error}</div>
    </PostContainer>
  );
  if (!post) return (
    <PostContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <div>Post not found</div>
    </PostContainer>
  );

  return (
    <PostContainer>
      <BackButton onClick={() => navigate(-1)}>Back to Blog</BackButton>
      
      <h1>{post.title}</h1>
      
      {post.imageUrl && <PostImage src={getImageUrl(post.imageUrl)} alt={post.title} />}
      
      <div>
        {post.date && (
          <p>{format(new Date(post.date), 'MMMM dd, yyyy')}</p>
        )}
        {post.tags && (
          <div>
            {post.tags.map(tag => (
              <span key={tag} style={{ marginRight: '0.5rem' }}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '2rem' }}>{post.content}</div>
      
      <footer style={{ marginTop: '2rem' }}>
        <p>Written by: {post.author}</p>
      </footer>
    </PostContainer>
  );
}

export default SinglePostPage;