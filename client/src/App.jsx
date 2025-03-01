import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/navbar";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/HomePage/HomePage"; // Import your other pages
import Results from "./Pages/Results";
import CreateAccountPage from './Pages/CreateAccountPage/CreateAccountPage';
import ProjectPage from './Pages/ProjectPage/ProjectPage';
import Account from './Pages/AccountPage/AccountPage';
import JudgingPage from './Components/JudgingPage/JudgingPage';
import CoachesPage from './Pages/CoachesPage/CoachesPage';
import Reset from './Pages/ResetPass/Reset';
import Footer from './Components/Footer'; // Import Footer
import { AppShell } from '@mantine/core';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AppShell style={{ minHeight: "100vh" }} footer={<Footer />}>
        <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/results" element={<Results />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/judging" element={<JudgingPage />} />
            <Route path="/coach" element={<CoachesPage />} />
            <Route path="/reset" element={<Reset />} />
          </Routes>
        </div>
      </AppShell>
    </Router>
  );
};

export default App;
