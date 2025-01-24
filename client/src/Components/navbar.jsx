import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/results">Results</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/preparation-docs">Preparation Docs</Link></li>
        <li><Link to="/archive">Archive</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
