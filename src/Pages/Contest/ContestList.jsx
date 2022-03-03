import React from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import "./ContestList.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import ContestListLogic from "./ContestListLogic";

const ContestList = () => {
  const { contestList } = ContestListLogic();

  return (
    <div className="contest-list-container">
      <div className="contest-list-card-container">
        <h1 className="contest-heading">Active Contest</h1>
        {Object.keys(contestList).map((id) => {
          return <ContestCard key={id} data={contestList[id]} id={id} />;
        })}

        <h1 className="contest-heading">Archived Contest</h1>
      </div>
      <div className="filter-container">
        <div className="skill-container filters">
          <p className="skill-lable">FILTER</p>
          <div>
            <FormControlLabel
              control={<Checkbox className="check-box" />}
              label="C++"
              className="check-box"
            />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox className="check-box" />}
              label="Java"
              className="check-box"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestList;
