// pages/BlogPage/BlogPage.jsx
import { useState, useEffect } from 'react';
import BlogPost from '../../components/BlogPost/BlogPost';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Fixed typo in isLoading
  const [error, setError] = useState(null);  // Added error state

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
    <div>
      <h1>Blog</h1>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : posts.length > 0 ? (
        posts.map(post => (
          <BlogPost key={post._id || post.id} post={post} />
        ))
      ) : (
        <p>No posts found. Please check if the backend server is running.</p>
      )}
    </div>
  );
};

export default BlogPage;