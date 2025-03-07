import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import { AuthProvider, useAuth } from "./auth/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // Prevents premature redirect

  return isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {

  return (
    <AuthProvider>
    <Router>
      {/* Render NavBar at the top of every page */}
      <NavBar />
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
            <Route path="/signin" element={<SignIn />} />
            <Route path="/results" element={<Results />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="single-project/:id" element = {<SingleProject></SingleProject>}/>
            <Route path="/account/:id" element={<Account />} />

             {/* Protected Routes */}
             <Route path="/judging" element={<ProtectedRoute element={<JudgingPage />} />} />
             <Route path="/coach" element={<ProtectedRoute element={<CoachesPage />} />} />
             
            <Route path="/reset" element={<Reset />} />
          </Routes>
        </div>
      </AppShell>

      {/* Render Footer at the bottom of every page */}
      <Footer />
    </Router>
    </AuthProvider>
  );
};

export default App;
