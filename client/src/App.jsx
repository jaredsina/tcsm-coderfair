import React from "react";
import "./App.css";
import NavBar from "./Components/navbar";
import ProjectPage from "./Components/ProjectPage";
import AccountPage from "./Components/AccountPage/AccountPage";
function App() {
  return (
    <>
      <NavBar />
      <ProjectPage />

      <AccountPage />
    </>
  );
}

export default App;
