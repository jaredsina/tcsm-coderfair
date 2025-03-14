import React from "react";
import ResultCard from "../Components/ResultCard/ResultCard";
import "./Results.css";

const Results = () => {
  return (
    <div className="results-container">
      <h1 className="results-title">Results</h1>
      <div className="results-grid">
        <ResultCard
          awardName="Top 3 Overall"
          projects={["Maya Sriram", "Aarav Arumugan", "Teddy Sierra"]}
          student_id={["67cb62bfa0b91ec6c757df7a","67cc98e3db06f0f876c87e8b","67cc8699b797034b69655ad8"]}
        />
        <ResultCard
          awardName="Top Creativity"
          projects={["Hritvik Rathore", "Teddy Sierra", "Aarav Arumugan"]}
          student_id={["67cb621671f30ade0657df77","67cc8699b797034b69655ad8","67cc98e3db06f0f876c87e8b"]}
        />
        <ResultCard
          awardName="Visionary Leaders"
          projects={["Avi Singh", "Louis Panetta III", "Jimmy Robertson","Kaliyan Raman"]}
          student_id={["67cb6200a0b91ec6c757df77","67cb62d8ce6a4f334b57df78","67ccab0d841fc9021dbc505f","67ccb103841fc9021dbc5062"]}
        />
        <ResultCard
          awardName="Rising Coders"
          projects={["Varsha Sundarrajan", "Gus Berkman", "Hritvik Rathore","Simon Van Treuren"]}
          student_id={["67cb628a71f30ade0657df7a","67ccadd744785c1e5ebc505e","67cb621671f30ade0657df77","67cb61f6ce6a4f334b57df76"]}
        />
        <ResultCard
          awardName="Game Masters"
          projects={["Alice Lin","Sergio A", "Gus Berkman", "Mason Phillips"]}
          student_id={["67cb422b1058d6425352afed","67cb61d871f30ade0657df76","67ccadd744785c1e5ebc505e","67cb62aece6a4f334b57df77"]}
        />
        <ResultCard
          awardName="High Achievers"
          projects={["Maddie Coppola","Alice Lin", "Cathal O’Rourke", "Ridhaan Dalvi"]}
          student_id={["67cc6219009a8d91135d50bd","67cb422b1058d6425352afed","67cb624b71f30ade0657df78","67cb629fa0b91ec6c757df79"]}
        />
      </div>
    </div>
  );
};

export default Results;
