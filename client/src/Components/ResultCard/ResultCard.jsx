import React from 'react';
import './ResultCard.css';

const ResultCard = () => {
  return (
    <div className="result-card">
      <h2 className="result-title">Award X</h2>
      <div className="result-block picture-block"></div>
      <div className="result-block frame-block"></div>
      <div className="result-block additional-block"></div>
    </div>
  );
};

export default ResultCard;
