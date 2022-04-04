import React from "react";
import { TabContext, TabPanel } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tab,
  Tabs,
} from "@mui/material";
import { Box } from "@mui/system";
import "./TestQuestionShow.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsMoon } from "react-icons/bs";
import { auth } from "../../Firebase/Firebase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TestQuestionList from "./TestQuestionList/TestQuestionList";
import TestQuestion from "./TestQuestion/TestQuestion";
import TestQuestionShowLogic from "./TestQuestionShowLogic";

const TestQuestionShow = () => {
  const {
    testQuestionData,
    isShowTestNavbar,
    value,
    handleChange,
    toggleDarkMode,
    isDarkMode,
    listTabNavigation,
    activeLanguage,
    editorMode,
    languageName,
    submitedQuestions,
    setSubmitedQuestions,
    finalTestSubmissionHandler,
    isOpenDialogBox,
    handleDialogBoxClose,
    agreeBtnClick,
    allLanguagesName,
    getActiveLang,
    type,
    name,
    userInfo,
    join,
  } = TestQuestionShowLogic();

  document.title = `${type}  | CodeWar`

  let tabNumber = 1;
  let tabValue = 3;
  let tabPanelNumber = 3;

  return (
    <div className="test-question-show-container">
      <Dialog
        open={isOpenDialogBox}
        onClose={handleDialogBoxClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit the test??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogBoxClose} className="agree-btn">
            Close
          </Button>
          <Button onClick={agreeBtnClick} className="agree-btn">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {isShowTestNavbar &&
        (type === "vsmode" ? (
          <div className="test-question-show-navbar">
            <div className="left-navbar-container">
              {join ? (
                <div className="navbar-username-container vsmode-navbar-username-container">
                  <PersonOutlineIcon className="navbar-person-icon" />
                  <p className="navbar-username">{userInfo.opponent_name}</p>
                </div>
              ) : (
                <div className="navbar-username-container vsmode-navbar-username-container">
                  <PersonOutlineIcon className="navbar-person-icon" />
                  <p className="navbar-username">{userInfo.creater_name}</p>
                </div>
              )}
            </div>
            <div className="middel-logo-container">
              <div className="test-header-logo-codewar vsmode-navbar-logo">
                <Link to="/">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275"
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="right-navbar-container vsmode-navbar-right-container">
              {!join ? (
                <div className="navbar-username-container">
                  <PersonOutlineIcon className="navbar-person-icon" />
                  <p className="navbar-username">{userInfo.opponent_name}</p>
                </div>
              ) : (
                <div className="navbar-username-container">
                  <PersonOutlineIcon className="navbar-person-icon" />
                  <p className="navbar-username">{userInfo.creater_name}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="test-question-show-navbar">
            <div className="left-navbar-container">
              <div className="test-header-logo-codewar">
                <Link to="/">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275"
                    alt="Logo"
                  />
                </Link>
              </div>
              <p>{name}</p>
            </div>
            <div className="right-navbar-container">
              <p className="answered-tag">
                Answered:{" "}
                <span>
                  {submitedQuestions.length}/
                  {testQuestionData ? Object.keys(testQuestionData).length : ""}
                </span>
              </p>
              <p className="navbar-time">
                <AccessTimeIcon className="navbar-time-icon" /> 90 mins
              </p>
              <p className="navbar-theme-icon">
                {isDarkMode ? (
                  <BsMoon
                    className="navbar-theme-icon-moon"
                    onClick={toggleDarkMode}
                  />
                ) : (
                  <LightModeOutlinedIcon
                    className="navbar-theme-icon"
                    onClick={toggleDarkMode}
                  />
                )}
              </p>
              <div className="navbar-username-container">
                <PersonOutlineIcon className="navbar-person-icon" />
                <p className="navbar-username">
                  {auth.currentUser.displayName}
                </p>
              </div>
            </div>
          </div>
        ))}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <TabContext value={value}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className={
              type === "vsmode"
                ? "test-question-show-tabs-hidden"
                : "test-question-show-tabs"
            }
          >
            {!isShowTestNavbar && (
              <Tab
                value="0"
                className="time-left-tab"
                label={
                  <div className="test-hide-left-side-navbar">
                    <p className="navbar-hide-time">90m left</p>
                  </div>
                }
              />
            )}
            <Tab value="1" className="test-question-show-tab" label="All" />
            <Tab
              value="2"
              className="test-question-show-tab warning-tab"
              label={<RiErrorWarningLine className="test-warning-icon" />}
            />
            {testQuestionData &&
              Object.keys(testQuestionData).map((id) => {
                return (
                  <Tab
                    value={`${tabValue++}`}
                    key={id}
                    className="test-question-show-tab number-tab"
                    label={tabNumber++}
                  />
                );
              })}
          </Tabs>

          {/* Tab panels */}

          <TabPanel
            value="1"
            className="test-question-show-tabpanel test-all-questions"
          >
            {type !== "vsmode" && (
              <>
                <TestQuestionList
                  testQuestionData={testQuestionData}
                  listTabNavigation={listTabNavigation}
                  submitedQuestions={submitedQuestions}
                />
                <Button
                  className="test-btn final-test-submit-btn"
                  variant="contained"
                  onClick={finalTestSubmissionHandler}
                >
                  Submit Test
                </Button>
              </>
            )}
          </TabPanel>
          <TabPanel value="2" className="test-question-show-tabpanel">
            Item Two
          </TabPanel>

          {testQuestionData ? (
            Object.keys(testQuestionData).map((id) => {
              return (
                <TabPanel
                  key={id}
                  value={`${tabPanelNumber++}`}
                  className="test-question-show-tabpanel question-panel"
                >
                  <TestQuestion
                    testQuestion={testQuestionData[id]}
                    activeLanguage={activeLanguage}
                    editorMode={editorMode}
                    languageName={languageName}
                    setSubmitedQuestions={setSubmitedQuestions}
                    submitedQuestions={submitedQuestions}
                    id={id}
                    allLanguagesName={allLanguagesName}
                    getActiveLang={getActiveLang}
                  />
                </TabPanel>
              );
            })
          ) : (
            <TabPanel
              value="0"
              className="test-question-show-tabpanel question-panel"
            >
              No
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </div>
  );
};

export default TestQuestionShow;
