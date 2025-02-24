"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "../CartContext";
import { motion, AnimatePresence } from "framer-motion";

const StyledHeader = styled.header`
  padding: 0rem 2rem;
  background: linear-gradient(135deg, #090673 0%, #1a1a8a 100%);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky; /* Fixed to stay on top */
  left: 0;
  top: 0;
  width: 100%;
  z-index: 3000; /* High z-index for header */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .logo {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    background: linear-gradient(45deg, #fff 0%, #a2d2ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 72px; /* Height of the header */
    left: 0;
    width: 100%;
    height: calc(100vh - 72px);
    background: rgba(9, 6, 115, 0.98);
    flex-direction: column;
    padding: 2rem;
    justify-content: flex-start;
    backdrop-filter: blur(15px);
    z-index: 3500; /* Above header content */
  }
`;

const NavLink = styled(motion.a)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: sticky;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #ff7f50;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1rem 0;
  }
`;

const CartBadge = styled(motion.span)`
  background: #ff7f50;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

const Hamburger = styled(motion.div)`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 3100; /* Above nav on mobile */

  span {
    height: 3px;
    width: 30px;
    background: #fff;
    margin-bottom: 5px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  &.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  &.active span:nth-child(2) {
    opacity: 0;
  }

  &.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledHeader>
      <Link href="/" className="logo">
        IITSKiLLMART
      </Link>

      <Hamburger className={isOpen ? "active" : ""} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </Hamburger>

      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <Nav
            as={motion.nav}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" legacyBehavior>
  <NavLink whileHover={{ scale: 1.05 }} className="cursor-pointer" onClick={() => setIsOpen(false)}>
    HOME
  </NavLink>
</Link>

<Link href="/AllProducts" legacyBehavior>
  <NavLink whileHover={{ scale: 1.05 }} className="cursor-pointer" onClick={() => setIsOpen(false)}>
    PRODUCTS
  </NavLink>
</Link>

<Link href="/About" legacyBehavior>
  <NavLink whileHover={{ scale: 1.05 }} className="cursor-pointer" onClick={() => setIsOpen(false)}>
    ABOUT
  </NavLink>
</Link>

<Link href="/Cart" legacyBehavior>
  <NavLink whileHover={{ scale: 1.05 }} className="cursor-pointer" onClick={() => setIsOpen(false)}>
    CART
    {cartProducts?.length > 0 && (
      <CartBadge initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
        {cartProducts.length}
      </CartBadge>
    )}
  </NavLink>
</Link>

          </Nav>
        )}
      </AnimatePresence>
    </StyledHeader>
  );
};

export default Header;
