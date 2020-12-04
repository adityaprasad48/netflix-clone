import React, { useEffect, useState } from "react";
import styled from "styled-components";

const NavBar = styled.nav<{scrollFixed: boolean}>`
  padding: 20px;
  
  background-color: ${props => props.scrollFixed ? '#111' : 'trasparent'};

  transition-timing-function: ${props => props.scrollFixed && 'ease-in'};
  transition: all 0.4s;
  z-index: 9999;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
`;

const Logo = styled.span`
  color: white;
  font-size: 2.4rem;
  font-weight: 700;

  &::first-letter {
    color: red;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const Guest = styled.div`
  margin-left: auto;
  width: 35px;
  height: 35px;
  background-color: white;

  border-radius: 50px;
  position: relative;

  &::after {
    content: "🎸";
    font-size: 2.4rem;
    position: absolute;
    transform: translate(-30%);
  }
`;

const Nav = () => {
  const [show, handleShow] = useState(false)
 

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 100) {
        handleShow(true)
      }
      else {
        handleShow(false)
      }
    });
    return () => {
      // window.removeEventListener("scroll");
    }
  }, [])

  return (
    <NavBar scrollFixed={show}>
      <Logo>Netflix</Logo>
      <Guest />
    </NavBar>
  );
};

export default Nav;
