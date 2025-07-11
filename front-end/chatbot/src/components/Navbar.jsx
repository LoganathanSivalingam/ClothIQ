import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
`;

const NavTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #ecf0f1;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 15px;
`;

const NavLink = styled(RouterNavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  padding: 10px 15px;
  border-radius: 5px;
  display: block;
  transition: background-color 0.3s ease;

  &.active {
    background-color: #3498db;
  }

  &:hover {
    background-color: #34495e;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavTitle>Admin Dashboard</NavTitle>
      <NavList>
        <NavItem>
          <NavLink to="/" end>
            Dashboard Overview
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/customers">
            Customers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/products">
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/sales">
            Sales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/campaigns">
            Campaigns
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/employees">
            Employees
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/feedback">
            Feedback
          </NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navbar;
