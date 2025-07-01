// src/components/BlogPost/BlogPost.jsx
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const PostContainer = styled.article`
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PostImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
`;

// Add this styled component definition
const PostTitle = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: #0066cc;
  }

  h2 {
    margin: 0.5rem 0;
  }
`;

function BlogPost({ post }) {
  if (!post) return null;

  //console.log('Post data:', post);  // Add this to see the post data
  //console.log('Image URL:', post.imageUrl);  // Add this to see the image URL

  return (
    <PostContainer>
      <PostTitle to={`/post/${post._id}`}>
        <h2>{post.title}</h2>
      </PostTitle>
      
      {post.imageUrl && <PostImage src={post.imageUrl} alt={post.title} />}
      
      <div>
        {post.date && (
          <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
        )}
        {post.tags && (
          <div>
            {post.tags.map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <p>{post.content.substring(0, 200)}...</p>
      <small>By: {post.author}</small>
    </PostContainer>
  );
}

export default BlogPost;