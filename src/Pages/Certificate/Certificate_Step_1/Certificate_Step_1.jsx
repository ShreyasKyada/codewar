import React, { useContext, useEffect, useState } from "react";
import "./Certificate_Step_1.css";
import { RiMedal2Line, RiErrorWarningLine } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { Tab } from "@mui/material";
import Certificate_Step_2 from "../Certificate_Step_2/Certificate_Step_2";
import { loginContext } from "../../../Context/LoginContext";
import { useParams } from "react-router-dom";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Certificate_Step_1 = () => {
  const [navigationTabValue, setNavigationTabValue] = useState("3");
  const { setActiveTab, setIsShowNavbar } = useContext(loginContext);
  const { certificate_name } = useParams();

  const navigationTabs = (event, newValue) => {
    setNavigationTabValue(newValue);
  };

  document.title = `${certificate_name} certificate | CodeWar`;

  useEffect(() => {
    setActiveTab("Certify");
    setIsShowNavbar(true);
  }, []);

  return (
    <>
      <div className="certificate-step1-container">
        <div className="certificate-step1-sub-container">
          <div className="step1-language-container">
            <div className="header-logo-container">
              <div className="test-header-logo">
                <div className="folded-corner"></div>
                <div className="certificate-container">
                  <div className="certi-name">{certificate_name.split(" ")[0]}</div>
                </div>
                <RiMedal2Line className="medal-icons" />
              </div>
            </div>
            <div className="certi-content">
              <p className="certi-heading">
                {" "}
                {certificate_name} Skills Certification Test
              </p>
              <div className="heading-bottom-container">
                {/* <div className="clock-icons">
                  <AccessTimeIcon />
                  <p>90 min</p>
                </div> */}
                <p className="step-1-certificate-sub-heading">{certificate_name.split(" ")[0]}</p>
              </div>
            </div>
          </div>
          <TabContext value={navigationTabValue}>
            <div className="certificate-step1-bottom-container">
              <div className="steps-navbar">
                <TabList className="certi-tablist" onChange={navigationTabs}>
                  <Tab
                    label={
                      <div className="steps-navbar-1">
                        <p className="step-numbers">1</p>
                        <p className="step-name">Review Profile</p>
                      </div>
                    }
                    className="certi-tabs"
                    disableRipple
                    value="3"
                  />
                  {navigationTabValue === "4" ? (
                    <Tab
                      disableRipple
                      label={
                        <div className="steps-navbar-2">
                          <FaPlay className="certi-play-icon" />
                          <p className="step-numbers">2</p>
                          <p className="step-name step-name-1">
                            Skills Certification Test
                          </p>
                        </div>
                      }
                      className="certi-tabs"
                      value="4"
                    />
                  ) : (
                    <Tab
                      disableRipple
                      label={
                        <div className="steps-navbar-2">
                          <FaPlay className="certi-play-icon" />
                          <p className="step-numbers">2</p>
                          <p className="step-name">Skills Certification Test</p>
                        </div>
                      }
                      disabled
                      className="certi-tabs"
                      value="4"
                    />
                  )}
                </TabList>
              </div>
              <div className="from-information-container">
                <TabPanel value="3" className="tabpanel-certi">
                  <p className="from-info-heading">Personal</p>
                  <div className="form-rows">
                    <div className="firstname-container">
                      <TextField
                        fullWidth
                        label="First name"
                        variant="standard"
                        className="certificate-textfield"
                      />
                    </div>
                    <div className="lastname-container">
                      <TextField
                        fullWidth
                        label="Last name"
                        variant="standard"
                        className="certificate-textfield"
                      />
                    </div>
                  </div>
                  <div className="form-rows">
                    <div className="warning-container">
                      <RiErrorWarningLine className="waring-icon" />
                      The above mentioned name will be displayed on your
                      certificate and cannot be changed later.
                    </div>
                  </div>
                  <div className="form-rows">
                    <div className="email-container">
                      <TextField
                        fullWidth
                        label="Email"
                        variant="standard"
                        className="certificate-textfield"
                      />
                    </div>
                  </div>
                  <div className="form-rows">
                    <div className="phone-container">
                      <TextField
                        fullWidth
                        label="Phone number"
                        variant="standard"
                        className="certificate-textfield"
                      />
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    className="proceed-btn"
                    onClick={() => setNavigationTabValue("4")}
                  >
                    Proceed
                  </Button>
                </TabPanel>
                <TabPanel value="4" className="tabpanel-certi">
                  <Certificate_Step_2 certificate_name={certificate_name} />
                </TabPanel>
              </div>
            </div>
          </TabContext>
        </div>
      </div>
    </>
  );
};

export default Certificate_Step_1;
