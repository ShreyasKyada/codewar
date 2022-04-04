import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { InputLabel, FormControl, NativeSelect } from "@mui/material";
import Button from "@mui/material/Button";
import "./Contest_Step_1.css";
import { loginContext } from "../../../Context/LoginContext";
import { Link, useParams } from "react-router-dom";
import appRef, { auth } from "../../../Firebase/Firebase";

const Contest_Step_1 = () => {
  const { setIsShowNavbar } = useContext(loginContext);
  const [contestData, setContestData] = useState({});
  const { name } = useParams();

  document.title = `${contestData.contest_name} | CodeWar`;

  useEffect(() => {
    setIsShowNavbar(false);
    let cleanUp = true;
    if (cleanUp) {
      appRef.child(`/contest/${name}`).on("value", (snapshot) => {
        setContestData(snapshot.val());
      });
    }

    return () => (cleanUp = false);
  }, []);

  return (
    <div className="conteststep1-container">
      <div className="conteststep1-container-left">
        <div className="conteststep1-title">
          <a href="/dashboard" className="dashboard-link logo-img">
            <img
              className="logo"
              src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275"
              alt="Logo"
            />
          </a>
          <h1 className="conteststep1-name">{contestData.contest_name}</h1>
          <div className="contest-detail-header">
            Competition Duration
            <div className="contest-detail-content">{contestData.duration}</div>
          </div>
          <div className="contest-detail-header">
            Starts at
            <div className="contest-detail-content">
              {contestData.starts_at}
            </div>
          </div>
          <div className="contest-detail-header">
            Ends at
            <div className="contest-detail-content">{contestData.ends_at}</div>
          </div>
        </div>
      </div>

      <div className="conteststep1-container-right">
        <div className="scrolling-form-page page-1">
          <div className="contest-scrolling-page">
            <h5>Welcome!</h5>
            <p className="paragraph">Welcome to {contestData.description}</p>

            <a href="#page-2" className="router-links">
              <Button
                style={{ fontSize: 15, marginTop: "0.5rem" }}
                variant="contained"
              >
                Let's Begin!
              </Button>
            </a>
          </div>
        </div>

        <div className="scrolling-form-page page-2">
          <div className="scrolling-form-page-section form-3">
            <div className="scrolling-page" id="page-2">
              <h5>The Rules</h5>

              <p className="paragraph">
                1. This contest is for individuals; teams are not allowed.
              </p>
              <p className="paragraph">
                2. Any competitor found cheating will be disqualified and banned
                from future coding contests.
              </p>
              <p className="paragraph">
                <strong>Scoring:&nbsp;</strong>
              </p>

              <p className="paragraph">
                Participants are ranked by score. Your score is determined by
                the number of test cases your code submission successfully
                passes. If two participants have the same score, the tie is
                broken by the contestant with the lowest amount of time taken.
              </p>
            </div>
          </div>
        </div>

        <div className="scrolling-form-page page-2">
          <div className="scrolling-form-page-section">
            <div className="scrolling-page">
              <h5>Registration Form</h5>
              <div className="paragraph">
                Logged in as <strong>{auth.currentUser.email}</strong>
              </div>

              <form>
                <p className="paragraph">
                  Before we begin, there are a couple more details that could
                  help us improve our service.
                </p>

                <div>
                  <TextField
                    required
                    fullWidth
                    id="standard-required"
                    label="Name"
                    variant="standard"
                    InputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 18 } }}
                  />
                </div>

                <div className="contest-form-control-container">
                  <FormControl
                    required
                    style={{
                      marginTop: "0.5rem",
                      width: "6.5rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <InputLabel
                      sx={{ m: 1, fontSize: 20 }}
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Country
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: "country",
                        id: "uncontrolled-native",
                      }}
                      sx={{ m: 1, fontSize: 20 }}
                    >
                      <option>India</option>
                      <option>USA</option>
                      <option>Uk</option>
                    </NativeSelect>
                  </FormControl>

                  <FormControl
                    required
                    style={{
                      marginTop: "0.5rem",
                      width: "6.5rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <InputLabel
                      sx={{ m: 1, fontSize: 20 }}
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      State
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: "state",
                        id: "uncontrolled-native",
                      }}
                      sx={{ m: 1, fontSize: 20 }}
                    >
                      <option>Gujrat</option>
                      <option>Maharashtra</option>
                      <option>Punjab</option>
                    </NativeSelect>
                  </FormControl>

                  <FormControl
                    required
                    style={{
                      marginTop: "0.5rem",
                      width: "6.5rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <InputLabel
                      sx={{ m: 1, fontSize: 20 }}
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      City
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: "city",
                        id: "uncontrolled-native",
                      }}
                      sx={{ m: 1, fontSize: 20 }}
                    >
                      <option>Surat</option>
                      <option>Rajkot</option>
                      <option>Ahemdabad</option>
                    </NativeSelect>
                  </FormControl>
                </div>

                <FormControl
                  required
                  style={{
                    marginTop: "0.5rem",
                    width: "6.5rem",
                    paddingTop: "0.5rem",
                    marginRight: "1.75rem",
                  }}
                >
                  <InputLabel
                    sx={{ m: 1, fontSize: 20 }}
                    variant="standard"
                    htmlFor="uncontrolled-native"
                  >
                    Univercity
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "univercity",
                      id: "uncontrolled-native",
                    }}
                    sx={{ m: 1, fontSize: 20 }}
                  >
                    <option>VNSGU</option>
                    <option>AEDFGH</option>
                    <option>IIM</option>
                  </NativeSelect>
                </FormControl>

                <FormControl
                  required
                  style={{
                    marginTop: "0.5rem",
                    width: "6.5rem",
                    paddingTop: "0.5rem",
                  }}
                >
                  <InputLabel
                    sx={{ m: 1, fontSize: 20 }}
                    variant="standard"
                    htmlFor="uncontrolled-native"
                  >
                    Class of
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "classof",
                      id: "uncontrolled-native",
                    }}
                    sx={{ m: 1, fontSize: 20 }}
                  >
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </NativeSelect>
                </FormControl>
              </form>
              <Button
                style={{ fontSize: 15, marginTop: "0.5rem" }}
                variant="contained"
                component={Link}
                to={`/test-questions-list/contest/${contestData.contest_name}`}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest_Step_1;
