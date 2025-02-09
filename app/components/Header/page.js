"use client";

import Link from 'next/link';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { CartContext } from '../CartContext';

const StyledHeader = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;900&display=swap');
  padding: 20px;
  background-color: #090673;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  nav {
    display: flex;
    gap: 20px;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #090673;
      padding: 20px;
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;

    span {
      height: 3px;
      width: 25px;
      background: #fff;
      margin-bottom: 4px;
      border-radius: 5px;
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }
`;

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledHeader $isOpen={isOpen}>
      <Link href="/" className="logo">
        E-COMMERCE
      </Link>
      <nav>
        <Link href="/">HOME</Link>
        <Link href="/AllProducts">ALL PRODUCTS</Link>
        <Link href="/About">ABOUT US</Link>
        {/* <Link href="/Login">LOGIN</Link> */}
        <Link href="/Cart">CART ({cartProducts?.length})</Link>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </div>
    </StyledHeader>
  );
};

export default Header;
