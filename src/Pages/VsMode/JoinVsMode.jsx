import React from "react";
import "./JoinVsMode.css";
import { Button } from "@mui/material";
import joinVectore from "../../Assets/join-vector.svg";

const JoinVsMode = () => {
  return (
    <div className="join-vs-mode-container">
      <div className="vs-mode-container-img">
        <img src={joinVectore} className="join"></img>
      </div>
      <div className="vs-mode-container-txt">
        <h1>Join Question</h1>
        <p className="vs-mode-sub-heading">
          <span>Enter Question Id you received from your Friend.</span>
        </p>
        <form className="vs-mode-inputbox-container">
          <input type="text" className="vs-mode-inputbox" maxLength="1"></input>
          <input type="text" className="vs-mode-inputbox" maxLength="1"></input>
          <input type="text" className="vs-mode-inputbox" maxLength="1"></input>
          <input type="text" className="vs-mode-inputbox" maxLength="1"></input>
          <br />
          <br />

          <Button
            color="primary"
            variant="contained"
            className="vsmode-join-btn"
          >
            Join
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinVsMode;
