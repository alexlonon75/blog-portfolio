// src/components/BlogPost/BlogPost.jsx
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';

const PostContainer = styled.article`
  margin: 2rem 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.accent}
    );
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &::before {
      opacity: 1;
    }
  }
`;

const PostLink = styled(Link)`
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const PostImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 1rem 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const PostTitle = styled.h2`
  margin: 0.5rem 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '# ';
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;

  span {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textInverse};
    }
  }
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 1rem 0;
`;

const PostAuthor = styled.small`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.primary};

  &::before {
    content: '~/';
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function BlogPost({ post }) {
  if (!post) return null;

  return (
    <PostContainer>
      <PostLink to={`/post/${post._id}`}>
        <PostTitle>{post.title}</PostTitle>

        {post.imageUrl && <PostImage src={getImageUrl(post.imageUrl)} alt={post.title} />}

        <PostMeta>
          {post.date && (
            <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
          )}
          <PostAuthor>{post.author}</PostAuthor>
        </PostMeta>

        {post.tags && (
          <TagsContainer>
            {post.tags.map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </TagsContainer>
        )}

        <PostExcerpt>{post.content.substring(0, 200)}...</PostExcerpt>
      </PostLink>
    </PostContainer>
  );
}

export default BlogPost;