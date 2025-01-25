import React from "react";
import "./App.css";
import NavBar from "./Components/navbar";
import JudgingPage from "./Components/JudgingPage/JudgingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";
import Results from "./Pages/Results";
import Account from "./Pages/AccountPage/AccountPage";
import Home from "./Pages/HomePage/HomePage";  

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/results" element={<Results />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
