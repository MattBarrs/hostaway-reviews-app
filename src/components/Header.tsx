import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="header">
    <NavLink to="/" className="brand">
      <img src="/header-logo.webp" alt="the flex." style={{ height: 32, width: 'auto' }} />
    </NavLink>
    <nav>
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/properties-dashboard">Properties</NavLink>
      <NavLink to="/dashboard">Manager Dashboard</NavLink>
    </nav>
  </header>
);

export default Header;
