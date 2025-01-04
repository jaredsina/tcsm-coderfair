import React from 'react';
import './navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#results">Results</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#preparation-docs">Preparation Docs</a></li>
        <li><a href="#archive">Archive</a></li>
        <li><a href="#account">Account</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
