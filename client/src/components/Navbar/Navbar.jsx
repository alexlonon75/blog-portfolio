// src/components/Navbar/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 0;
    background: white;
    width: 100%;
    padding: 1rem;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContainer>
      <Link to="/">
        <h1>Alex Lonon</h1>
      </Link>
      
      <NavLinks isOpen={isOpen}>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;