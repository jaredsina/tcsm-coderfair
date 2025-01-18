import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/navbar";
import ProjectPage from "./Pages/ProjectPage";
import Results from "./Pages/Results"; 
import PreparationDocs from "./Pages/PreparationDocs";
import Archive from "./Pages/Archive";
import Account from "./Pages/Account";
import Home from "./Pages/Home";  // If you want a Home component for the root route

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />  {/* Assuming you want a Home page */}
        <Route path="/results" element={<Results />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/preparation-docs" element={<PreparationDocs />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
