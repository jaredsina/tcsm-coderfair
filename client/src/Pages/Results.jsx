import React from 'react';
import './Results.css';
import ResultCard from '../Components/ResultCard/ResultCard'; // Adjusted relative path

const Results = () => {
  return (
    <div className="results-container">
      <ResultCard />
      <ResultCard />
      <ResultCard />
    </div>
  );
};

export default Results;