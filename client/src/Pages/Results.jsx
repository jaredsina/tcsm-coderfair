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
          projects={["Thomas", "Neeyan", "Erich"]}
          student_id={["6a232fd7be73eaf4fa72b6f0","6a230df1e948da13261cbbc5","6a232e7ada2c7cee5f72b6ec"]}
        />
        <ResultCard
          awardName="Top Creativity"
          projects={["Yuhao", "Donovan", "Emile","Charlie"]}
          student_id={["6a2468ec29bcb6ef7aaafd8c","6a2197415a0146091ea010b0","6a23c4d242b4de531e5a71e3","6a220459f21d0c35d959c285"]}
        />
        <ResultCard
          awardName="Visionary Leaders"
          projects={["Lilliana", "Vedansh", "Kabir","Aaradhya"]}
          student_id={["6a1a1a662c5436caf95f9669","6a219732bb3e9b507ba010af","6a22049884fa10375b59c284","67ccb103841fc9021dbc5062","6a246a4479eede5fddaafd8b"]}
        />
        <ResultCard
          awardName="Rising Coders"
          projects={["Sarina", "Louella", "Manomay","Abhiram"]}
          student_id={["6a232affda2c7cee5f72b6e9","6a2197224b1c1c07a7a010af","6a232e4abe73eaf4fa72b6eb","6a246b1479eede5fddaafd8c"]}
        />
        <ResultCard
          awardName="Game Masters"
          projects={["Marvin", "Jason", "Aiden"]}
          student_id={["6a232e9cbe73eaf4fa72b6ed","6a1a17a3f1518a419293995b","6a1a1b0d1c82bfbad55f966c"]}
        />
        <ResultCard
          awardName="High Achievers"
          projects={["Kenneth","Christian", "Immanuel"]}
          student_id={["6a232dcfbe73eaf4fa72b6ea","6a232ec7da2c7cee5f72b6ed","6a21970e5a0146091ea010af"]}
        />
      </div>
    </div>
  );
};

export default Results;
