import React, { useContext, useEffect } from "react";
import "./JoinVsMode.css";
import { Button, useMediaQuery } from "@mui/material";
import joinVectore from "../../Assets/join-vector.svg";
import { loginContext } from "../../Context/LoginContext";
import JoinVsModeLogic from "./JoinVsModeLogic";

const JoinVsMode = () => {
  const { setActiveTab, setSnackbarData } = useContext(loginContext);
  const smallScreen = useMediaQuery("(max-width:600px)");
  const {
    txtbox_1,
    txtbox_2,
    txtbox_3,
    txtbox_4,
    txtboxOnchangeHalder,
    txtboxKeyDown,
    inputboxValue,
    joinBtnHandler,
  } = JoinVsModeLogic();

  useEffect(() => {
    if (smallScreen) {
      setSnackbarData(
        "We recommend to open in desktop for the best experience.",
        "error"
      );
    }
  }, [smallScreen]);

  document.title = `Vs mode | CodeWar`;

  useEffect(() => {
    setActiveTab("Vs Mode");
  }, []);

  return (
    <div className="join-vs-mode-container">
      <div className="vs-mode-container-img">
        <img src={joinVectore} className="join"></img>
      </div>
      <div className="vs-mode-container-txt">
        <div className="vs-mode-sub-container-txt">
          <h1>Join Question</h1>
          <p className="vs-mode-sub-heading">
            <span>Enter Question Id you received from your Friend.</span>
          </p>
          <form className="vs-mode-inputbox-container">
            <input
              ref={txtbox_1}
              name="txtbox_1"
              type="text"
              onChange={txtboxOnchangeHalder}
              className="vs-mode-inputbox"
              maxLength="1"
              value={inputboxValue[0]}
              onKeyDown={txtboxKeyDown}
            ></input>
            <input
              ref={txtbox_2}
              name="txtbox_2"
              type="text"
              onChange={txtboxOnchangeHalder}
              className="vs-mode-inputbox"
              maxLength="1"
              onKeyDown={txtboxKeyDown}
            ></input>
            <input
              ref={txtbox_3}
              name="txtbox_3"
              type="text"
              onChange={txtboxOnchangeHalder}
              className="vs-mode-inputbox"
              maxLength="1"
              onKeyDown={txtboxKeyDown}
            ></input>
            <input
              ref={txtbox_4}
              name="txtbox_4"
              type="text"
              onChange={txtboxOnchangeHalder}
              className="vs-mode-inputbox"
              maxLength="1"
              onKeyDown={txtboxKeyDown}
            ></input>
            <br />
            <br />

            <Button
              color="primary"
              variant="contained"
              className="vsmode-join-btn"
              onClick={joinBtnHandler}
            >
              Join
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinVsMode;
