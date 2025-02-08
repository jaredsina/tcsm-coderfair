import React from "react";
import "./App.css";
import NavBar from "./Components/navbar";
import JudgingPage from "./Components/JudgingPage/JudgingPage";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";
import Results from "./Pages/Results";
import Account from "./Pages/AccountPage/AccountPage";
import Home from "./Pages/HomePage/HomePage";
import SignIn from "./Pages/SignIn"; // Import the Sign-In page

function App() {
  // Custom Hook to show/hide NavBar based on the current route
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  return (
    <>
      {showNavBar && <NavBar />}{' '}
      {/* Only show NavBar if not on the SignIn page */}
      <Routes>
        {/* Default route is the Sign-In page */}
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/judging" element={<JudgingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
