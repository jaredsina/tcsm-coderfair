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
          projects={["TBA", "TBA", "TBA"]}
        />
        <ResultCard
          awardName="Most Innovative"
          projects={["TBA", "TBA", "TBA"]}
        />
        <ResultCard
          awardName="Community Impact"
          projects={["TBA", "TBA", "TBA"]}
        />
        <ResultCard
          awardName="Best Design"
          projects={["TBA", "TBA", "TBA"]}
        />
        <ResultCard
          awardName="Most Innovative"
          projects={["TBA", "TBA", "TBA"]}
        />
        <ResultCard
          awardName="Community Impact"
          projects={["TBA", "TBA", "TBA"]}
        />
      </div>
    </div>
  );
};

export default Results;
