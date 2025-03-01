import React from "react";
import "./App.css";
import NavBar from "./Components/navbar";
import JudgingPage from "./Components/JudgingPage/JudgingPage";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage/ProjectPage";
import Results from "./Pages/Results";
import Account from "./Pages/AccountPage/AccountPage";
import Home from "./Pages/HomePage/HomePage";
import SignIn from "./Pages/SignIn"; // Import the Sign-In page
import CoachesPage from "./Pages/CoachesPage/CoachesPage"; // Import the new page
import Reset from "./Pages/ResetPass/Reset";
import Footer from "./Components/Footer";
import { AppShell } from "@mantine/core";
import CreateAccountPage from './Pages/CreateAccountPage/CreateAccountPage';

function App() {
  // Custom Hook to show/hide NavBar based on the current route
  const location = useLocation();
  const showElements = location.pathname !== "/" && location.pathname !== "/reset";

  return (
    <>
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
      >
        {showElements && <NavBar />}
        <div>
          <Routes>
            {/* Default route is the Sign-In page */}
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/judging" element={<JudgingPage />} />
            <Route path="/coach" element={<CoachesPage />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
          </Routes>
        </div>
        {showElements && <Footer />}
      </AppShell>
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
