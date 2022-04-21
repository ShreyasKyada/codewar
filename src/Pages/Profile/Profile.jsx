import React, { useContext } from "react";
import "./Profile.css";
import { FiEdit } from "react-icons/fi";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
  TextField,
} from "@mui/material";
import { VscSymbolFile } from "react-icons/vsc";
import { TiClipboard } from "react-icons/ti";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import skill from "../../Assets/skill.svg";
import { RiMedal2Line } from "react-icons/ri";
import { BsTrophy } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import ProfileLogic from "./ProfileLogic";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import { loginContext } from "../../Context/LoginContext";

const Profile = () => {
  const {
    aboutPopupOpenHandler,
    handleAboutDialogBoxClose,
    aboutPopupDialogBox,
    aboutAgreeBtn,
    profileAboutData,
    aboutChangeHandler,
    difficultyLevelTotalQuestions,
    difficultyLevelSolvedQuestion,
    allCertificateProfile,
    solvedQuestions,
    contestHistory,
    vsModeHistory,
  } = ProfileLogic();

  document.title = `${auth.currentUser.displayName} | CodeWar`;

  const { setActiveTab } = useContext(loginContext);
  setActiveTab("");
  const percentage =
    ((difficultyLevelSolvedQuestion.easy +
      difficultyLevelSolvedQuestion.medium +
      difficultyLevelSolvedQuestion.hard) /
      (difficultyLevelTotalQuestions.easy +
        difficultyLevelTotalQuestions.medium +
        difficultyLevelTotalQuestions.hard)) *
    100;

  return (
    <div className="profile-main-container">
      <Dialog
        open={aboutPopupDialogBox}
        onClose={handleAboutDialogBoxClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div id="alert-dialog-description">
            <h1 className="profile-about-heading">About</h1>
            <div className="about-container-dialogbox">
              <TextField
                className="profile-about-container"
                label="About"
                variant="standard"
                multiline={true}
                name="more_about"
                value={profileAboutData && profileAboutData.more_about}
                onChange={aboutChangeHandler}
              />
              <TextField
                label="I am currently a"
                variant="standard"
                className="about-txtfield"
                name="current"
                value={profileAboutData && profileAboutData.current}
                onChange={aboutChangeHandler}
              />
              <TextField
                label="Graduation Year"
                variant="standard"
                className="about-txtfield"
                name="graduation_year"
                value={profileAboutData && profileAboutData.graduation_year}
                onChange={aboutChangeHandler}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="profile-dialogActions">
          <Button
            onClick={handleAboutDialogBoxClose}
            className="agree-btn"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={aboutAgreeBtn}
            className="agree-btn"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div className="profile-details-container">
        <div className="profile-icons-container">
          <Avatar className="profile-txt-avatar">
            {auth.currentUser.displayName.charAt(0)}
          </Avatar>
        </div>
        <div className="profile-name-container">
          <h5 className="profile-name">{auth.currentUser.displayName}</h5>
          <p className="profile-email">{auth.currentUser.email}</p>
          <p className="profile-contry">India</p>
        </div>
        <div>
          <div className="about-container">
            <h5 className="profile-about-heading">About</h5>
            <FiEdit
              className="about-edit-icon"
              onClick={aboutPopupOpenHandler}
            />
          </div>
          <div className="other-profile-info-container">
            <p>Current</p>
            <p className="no-bold">{profileAboutData.current}</p>
          </div>
          <div className="other-profile-info-container">
            <p>Expected year of Graduation</p>
            <h5 className="no-bold">{profileAboutData.graduation_year}</h5>
          </div>
          <div className="other-profile-info-container">
            <p>More about me</p>
            <p className="no-bold">{profileAboutData.more_about}</p>
          </div>
        </div>
      </div>
      <div className="profile-card-container">
        <div className="profile-card-sub-container">
          <h3 className="solved-problem">Solved Problem</h3>
          <div className="profile-progress-container">
            <div className="circularprogress">
              <div className="percentage-container">
                <h2 className="percentage">
                  {difficultyLevelSolvedQuestion.easy +
                    difficultyLevelSolvedQuestion.medium +
                    difficultyLevelSolvedQuestion.hard}
                </h2>
                <p className="percentage-heading">Solved</p>
              </div>
              <CircularProgressbar
                value={percentage}
                className="circle"
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: "round",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: "#03cffc",
                  trailColor: "#3b3b3b",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
            <div className="Lineprogress">
              <div>
                <div className="lineprogress-data-container">
                  <p className="filter">Easy</p>
                  <p className="score">
                    {difficultyLevelSolvedQuestion.easy}/
                    {difficultyLevelTotalQuestions.easy}
                  </p>{" "}
                </div>
                <LinearProgress
                  value={
                    (difficultyLevelSolvedQuestion.easy /
                      difficultyLevelTotalQuestions.easy) *
                    100
                  }
                  color="success"
                  variant="determinate"
                  className="lineprogress-line"
                />
              </div>
              <div>
                <div className="lineprogress-data-container">
                  <p className="filter">Medium</p>
                  <p className="score">
                    {difficultyLevelSolvedQuestion.medium}/
                    {difficultyLevelTotalQuestions.medium}
                  </p>
                </div>
                <LinearProgress
                  value={
                    (difficultyLevelSolvedQuestion.medium /
                      difficultyLevelTotalQuestions.medium) *
                    100
                  }
                  color="warning"
                  variant="determinate"
                  className="lineprogress-line"
                />
              </div>
              <div>
                <div className="lineprogress-data-container">
                  <p className="filter">Hard</p>
                  <p className="score">
                    {difficultyLevelSolvedQuestion.hard}/
                    {difficultyLevelTotalQuestions.hard}
                  </p>
                </div>

                <LinearProgress
                  value={
                    (difficultyLevelSolvedQuestion.hard /
                      difficultyLevelTotalQuestions.hard) *
                    100
                  }
                  color="error"
                  variant="determinate"
                  className="lineprogress-line"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="verified-skills-container">
          <div className="verified-skill-heading">
            <VscSymbolFile className="file-icon" />
            <h5 className="skill">Verified Skills</h5>
          </div>
          <div className="verified-skills">
            {allCertificateProfile ? (
              <div className="profile-certificate-container">
                {Object.values(allCertificateProfile).map((val) => {
                  return (
                    <div
                      key={Math.random()}
                      className="test-header-logo profile-certi-icon"
                    >
                      <div className="folded-corner"></div>
                      <div className="certificate-container">
                        <div className="certi-name">{val.split(" ")[0]}</div>
                      </div>
                      <RiMedal2Line className="medal-icons" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <img src={skill} className="skill-icon"></img>
                <p className="skill-txt">
                  You have not earned any certificates yet. Get Certifid.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="submission-container">
          <div className="verified-skill-heading">
            <FaUserFriends className="submission-icon" />
            <h5 className="submission-txt">Vs Mode</h5>
          </div>
          <div className="vs-mode-history-container">
            {vsModeHistory ? (
              Object.values(vsModeHistory).map((val) => {
                return (
                  <div className="vs-mode-hostory" key={Math.random()}>
                    <p className="vs-mode-question-name">{val.question_name}</p>
                    <div className="vs-mode-bottom-container">
                      <div className="vs-mode-history-right-container">
                        <Avatar
                          className={
                            val.winning_status === "loss"
                              ? "vs-mode-avatar loss"
                              : "vs-mode-avatar win"
                          }
                        >
                          {auth.currentUser.displayName.charAt(0)}
                        </Avatar>
                        <p>You</p>
                        {val.winning_status === "loss" ? (
                          <p className="loss-txt">{val.winning_status}</p>
                        ) : (
                          <p className="win-txt">{val.winning_status}</p>
                        )}
                      </div>
                      <div className="vs-mode-history-left-container">
                        <Avatar
                          className={
                            val.winning_status === "loss"
                              ? "vs-mode-avatar win"
                              : "vs-mode-avatar loss"
                          }
                        >
                          {val.opponent_userName.charAt(0)}
                        </Avatar>
                        <p>{val.opponent_userName}</p>
                        {val.winning_status === "loss" ? (
                          <p className="win-txt">Win</p>
                        ) : (
                          <p className="loss-txt">loss</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                {" "}
                <p>Oops..!! no record found</p>
              </div>
            )}
          </div>
        </div>
        {solvedQuestions && (
          <div className="submission-container">
            <div className="verified-skill-heading">
              <TiClipboard className="submission-icon" />
              <h5 className="submission-txt">Submissions</h5>
            </div>

            {Object.values(solvedQuestions).map((val) => {
              if (val.status === "submited") {
                return (
                  <Link
                    key={Math.random()}
                    className="submission-link"
                    to={`/question-show/${val.language_name}/${val.id}`}
                  >
                    <p className="submission-p">{val.question_heading}</p>
                  </Link>
                );
              }
            })}
          </div>
        )}

        {contestHistory && (
          <div className="submission-container">
            <div className="verified-skill-heading">
              <BsTrophy className="submission-icon" />
              <h5 className="submission-txt">Contest</h5>
            </div>
            {console.log(contestHistory)}
            {Object.values(contestHistory).map((val) => {
              return (
                <p className="submission-p" key={Math.random()}>
                  {val.name} ({val.status})
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
