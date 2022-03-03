import { TabContext, TabPanel } from "@mui/lab";
import { Divider, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../Context/LoginContext";
import "./TestQuestionShow.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { themeContext } from "../../Context/ThemeContext";
import { BsMoon } from "react-icons/bs";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TestQuestionList from "./TestQuestionList/TestQuestionList";
import TestQuestion from "./TestQuestion/TestQuestion";

const TestQuestionShow = () => {
  const { setIsShowNavbar } = useContext(loginContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);
  const [isShowTestNavbar, setIsShowTestNavbar] = useState(true);
  const [value, setValue] = React.useState("1");

  useEffect(() => {
    setIsShowNavbar(false);
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === "0") {
      return;
    }
    if (newValue !== "0") setValue(newValue);
    if (newValue >= "3") {
      setIsShowTestNavbar(false);
    } else {
      setIsShowTestNavbar(true);
    }
  };

  const toggleDarkMode = () => {
    if (isDarkMode) setIsDarkMode(false);
    else setIsDarkMode(true);
  };

  return (
    <div className="test-question-show-container">
      {isShowTestNavbar ? (
        <div className="test-question-show-navbar">
          <div className="left-navbar-container">
            <div className="test-header-logo-codewar">
              <Link to="/">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/logo6.png?alt=media&token=f4888329-9045-4048-aff5-c6437090971d"
                  alt="Logo"
                />
              </Link>
            </div>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="right-navbar-container">
            <p className="answered-tag">
              Answered: <span>0/6</span>
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
              <p className="navbar-username">shreyas</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
            className="test-question-show-tabs"
          >
            {!isShowTestNavbar && (
              <Tab
                value="0"
                className="time-left-tab"
                label={
                  <div className="test-hide-left-side-navbar">
                    <p className="navbar-hide-time">190m left</p>
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
            <Tab
              value="3"
              className="test-question-show-tab number-tab"
              label={1}
            />
            <Tab
              value="4"
              className="test-question-show-tab number-tab"
              label={2}
            />
          </Tabs>

          <TabPanel value="1" className="test-question-show-tabpanel">
            <TestQuestionList />
          </TabPanel>
          <TabPanel value="2" className="test-question-show-tabpanel">
            Item Two
          </TabPanel>
          <TabPanel value="3" className="test-question-show-tabpanel question-panel">
            <TestQuestion />
          </TabPanel>
          <TabPanel value="4" className="test-question-show-tabpanel">
            2
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default TestQuestionShow;
