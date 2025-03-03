import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/navbar";
import Home from "./Pages/HomePage/HomePage";
import Results from "./Pages/Results";
import SignIn from "./Pages/SignIn"; // Import the Sign-In page
import SingleProject from "./Pages/Single-ProjectPage/SingleProject";
import Footer from "./Components/Footer";
import { AppShell } from "@mantine/core";
import CreateAccountPage from './Pages/CreateAccountPage/CreateAccountPage';
import ProjectPage from './Pages/ProjectPage/ProjectPage';
import Account from './Pages/AccountPage/AccountPage';
import JudgingPage from './Components/JudgingPage/JudgingPage';
import CoachesPage from './Pages/CoachesPage/CoachesPage';
import Reset from './Pages/ResetPass/Reset';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* Render NavBar at the top of every page */}
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      
      <AppShell
        styles={{
          root: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          },
          main: {
            flex: 1,
            paddingBottom: 0
          }
        }}
      >        <div>
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
            <Route path="single-project" element = {<SingleProject></SingleProject>}/>
          </Routes>
        </div>
      </AppShell>

      {/* Render Footer at the bottom of every page */}
      <Footer />
    </Router>
  );
};

export default App;
