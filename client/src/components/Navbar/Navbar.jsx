// src/components/Navbar/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;

  h1 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transition: ${({ theme }) => theme.transitions.fast};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: ${({ theme }) => theme.transitions.fast};
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: ${({ theme }) => theme.colors.primary};
      transition: ${({ theme }) => theme.transitions.fast};
      transform: translateX(-50%);
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.surface};
      text-shadow: 0 0 8px ${({ theme }) => theme.colors.primary};

      &::before {
        width: 80%;
      }
    }

    &.active {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.surface};

      &::before {
        width: 80%;
      }
    }
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 0;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    width: 200px;
    padding: 1rem;
    box-shadow: ${({ theme }) => theme.shadows.large};

    a {
      padding: 0.75rem;
      margin: 0.25rem 0;
    }
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.small};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContainer>
      <Link to="/">
        <h1>alex lonon</h1>
      </Link>

      <MobileToggle onClick={() => setIsOpen(!isOpen)}>
        ☰
      </MobileToggle>

      <NavLinks isOpen={isOpen}>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;