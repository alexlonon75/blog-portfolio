// styles/globalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    background-image:
      radial-gradient(circle at 25% 25%, rgba(0, 255, 65, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 107, 53, 0.05) 0%, transparent 50%);
    min-height: 100vh;
    transition: ${({ theme }) => theme.transitions.normal};
  }

  /* Terminal-style scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  /* Selection styling */
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
  }

  ::-moz-selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight};
      text-shadow: 0 0 8px ${({ theme }) => theme.colors.primary};
    }
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Code styling */
  code {
    font-family: ${({ theme }) => theme.fonts.primary};
    background: ${({ theme }) => theme.colors.surface};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.primary};
  }

  pre {
    font-family: ${({ theme }) => theme.fonts.primary};
    background: ${({ theme }) => theme.colors.surface};
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    border: 1px solid ${({ theme }) => theme.colors.border};

    code {
      background: none;
      padding: 0;
    }
  }

  /* Terminal-style input focus */
  input, textarea, button {
    font-family: inherit;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5em;

    &::before {
      content: '> ';
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  /* Paragraph styling */
  p {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Terminal-style button base */
  button {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.primary};
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.surfaceHover};
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.shadows.small};
    }
  }
`;