import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  return (
    <Nav>
      <Logo onClick={() => history.push("/")}>Blitz</Logo>
      <NavGroup>
        <NavItem onClick={() => history.push("/")}>Chats</NavItem>
        <NavItem onClick={() => history.push("/Friends")}>Friends</NavItem>
        <NavItem onClick={() => history.push("/Profile")}>Profile</NavItem>
        <NavItem onClick={() => history.push("/Dev")}>Dev</NavItem>
        {!showMenu && (
          <MenuBtn
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            ☰
          </MenuBtn>
        )}
      </NavGroup>

      {showMenu && (
        <Menu>
          <MenuBtn
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            X
          </MenuBtn>
          <MenuItem
            onClick={() => {
              history.push("/");
              setShowMenu(false);
            }}
          >
            Chats
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/Friends");
              setShowMenu(false);
            }}
          >
            Friends
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/Profile");
              setShowMenu(false);
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/Dev");
              setShowMenu(false);
            }}
          >
            Dev
          </MenuItem>
        </Menu>
      )}
    </Nav>
  );
};

const Nav = styled.div`
  height: 70px;
  z-index: 2000;
  width: calc(100% - 2rem);
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const MenuItem = styled.a`
  margin: 1rem;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
`;

const Menu = styled.div`
  z-index: 100;
  width: 200px;
  right: 0;
  top: 0;
  height: 100vh;
  position: fixed;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  background: rgb(116 116 116 / 80%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  @media (min-width: 800px) {
    display: none;
  }
`;

const MenuBtn = styled.button`
  text-align: end;
  outline: none;
  border: none;
  background: none;
  color: black;
  font-weight: 600;
  @media (min-width: 800px) {
    display: none;
  }
  font-weight: 600;
  font-size: 32px;
`;

const Logo = styled.div`
  font-family: cursive;
  // color: #151313;
  font-size: 2rem;
  cursor: default;
`;

const NavGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  color: #4d4a4a;
`;

const NavItem = styled.a`
  margin: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  @media (max-width: 800px) {
    display: none;
  }
`;
