import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Burger } from '@mantine/core';
import './navbar.css';
import Notifs from './Notification/Notification';
const NavBar = () => {
  const [opened, setOpened] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo or title */}
      <div className="nav-header">
        <Link to="/home" className="logo">
          CoderFair
        </Link>
        {/* Burger icon for mobile */}
        <Burger
          opened={opened}
          onClick={() => setOpened((prev) => !prev)}
          size="sm"
          className="burger-icon"
        />
      </div>

      {/* Navigation links */}
      <ul className={`nav-links ${opened ? 'open' : ''}`}>
        <li>
          <Link to="/home" onClick={() => setOpened(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/results" onClick={() => setOpened(false)}>
            Results
          </Link>
        </li>
        <li>
          <Link to="/projects" onClick={() => setOpened(false)}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/account" onClick={() => setOpened(false)}>
            Account
          </Link>
        </li>
        <li>
          <Link to="/judging" onClick={() => setOpened(false)}>
            Judging
          </Link>
        </li>
        <li><Notifs /></li>
      </ul>

    </nav>
  );
};

export default NavBar;
