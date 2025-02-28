import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Burger, Button, Avatar } from "@mantine/core";
import "./navbar.css";

const NavBar = () => {
  const [opened, setOpened] = useState(false);

  const handleSignOut = () => {
    window.location.href = "/"; // Redirect to the sign-in page
  };

  return (
    <nav className="navbar">
      {/* Logo and Burger Icon */}
      <div className="nav-header">
        <Link to="/home" className="logo">
          CoderFair
        </Link>
        <Burger
          opened={opened}
          onClick={() => setOpened((prev) => !prev)}
          size="sm"
          className="burger-icon"
        />
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${opened ? "open" : ""}`}>
        <li>
          <Link to="/home" onClick={() => setOpened(false)}>Home</Link>
        </li>
        <li>
          <Link to="/results" onClick={() => setOpened(false)}>Results</Link>
        </li>
        <li>
          <Link to="/projects" onClick={() => setOpened(false)}>Projects</Link>
        </li>
        <li>
          <Link to="/judging" onClick={() => setOpened(false)}>Judging</Link>
        </li>
        <li>
           <Link to="/coach" onClick={() => setOpened(false)}>Coach Dashboard</Link>
        </li>

      </ul>

      {/* User Profile Dropdown */}
      <Menu shadow="md" width={150}>
        <Menu.Target>
          <Avatar className="user-avatar" radius="xl" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} to="/account">Account</Menu.Item>
          <Menu.Item onClick={handleSignOut} className="sign-out">Sign Out</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </nav>
  );
};

export default NavBar;
