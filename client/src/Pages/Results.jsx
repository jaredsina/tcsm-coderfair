import React from "react";
import ResultCard from "../Components/ResultCard/ResultCard";
import "./Results.css";

const Results = () => {
  return (
    <div className="results-container">
      <h1 className="results-title">Results</h1>
      <div className="results-grid">
        <ResultCard
          awardName="Best Design"
          projects={["Project Alpha", "Project Beta", "Project Gamma"]}
        />
        <ResultCard
          awardName="Most Innovative"
          projects={["Project Delta", "Project Epsilon", "Project Zeta"]}
        />
        <ResultCard
          awardName="Community Impact"
          projects={["Project Theta", "Project Iota", "Project Kappa"]}
        />
        <ResultCard
          awardName="Best Design"
          projects={["Project Alpha", "Project Beta", "Project Gamma"]}
        />
        <ResultCard
          awardName="Most Innovative"
          projects={["Project Delta", "Project Epsilon", "Project Zeta"]}
        />
        <ResultCard
          awardName="Community Impact"
          projects={["Project Theta", "Project Iota", "Project Kappa"]}
        />
      </div>
    </div>
  );
};

export default Results;
