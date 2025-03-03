import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Burger, Avatar } from "@mantine/core";
import "./navbar.css";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false); // Log out user
      navigate("/signin");
    } else {
      navigate("/signin"); // Navigate to sign-in page
    }
  };

  return (
    <nav className="navbar">
      {/* Logo and Burger Icon */}
      <div className="nav-header">
        <Link to="/" className="logo" onClick={() => setOpened(false)}>
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
          <Link to="/" onClick={() => setOpened(false)}>Home</Link>
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
          {isAuthenticated ? (
            <>
              <Menu.Item component={Link} to="/account">
                Account
              </Menu.Item>
              <Menu.Item onClick={handleAuthAction} className="sign-out">
                Sign Out
              </Menu.Item>
            </>
          ) : (
            <Menu.Item component={Link} to="/signin" className="sign-in">
              Sign In
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </nav>
  );
};

export default NavBar;
