import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => (
  <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:12,borderBottom:'1px solid #eee',background:'#fff'}}>
    <div style={{fontWeight:700}}>Hostaway Reviews</div>
    <nav style={{display:'flex',gap:16}}>
      <NavLink exact to="/" activeStyle={{fontWeight:700}} style={{textDecoration:'none'}}>Home</NavLink>
      <NavLink to="/dashboard" activeStyle={{fontWeight:700}} style={{textDecoration:'none'}}>Manager Dashboard</NavLink> 
    </nav>
  </header>
);

export default Header;