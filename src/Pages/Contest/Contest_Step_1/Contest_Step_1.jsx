import React, { useContext, useEffect } from "react";
import { TextField } from "@mui/material";
import { InputLabel, FormControl, NativeSelect } from "@mui/material";
import Button from "@mui/material/Button";
import "./Contest_Step_1.css";
import { loginContext } from "../../../Context/LoginContext";

const Contest_Step_1 = () => {
  const { setIsShowNavbar } = useContext(loginContext);

  useEffect(() => {
    setIsShowNavbar(false);
  }, []);

  return (
    <div className="conteststep1-container">
      <div className="conteststep1-container-left">
        <div className="conteststep1-title">
          <a href="/dashboard" class="dashboard-link">
            <img
              className="logo"
              src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/logo6.png?alt=media&token=bd2d177a-3210-43d5-8a49-db66b4a94cdb"
              alt="Logo"
            />
          </a>
          <h1 class="conteststep1-name">
            National Disability Independence Day 2021 Coding Contest
          </h1>
          <div class="contest-detail-header">
            Competition Duration
            <div class="contest-detail-content">180 minutes</div>
          </div>
          <div class="contest-detail-header">
            Starts at
            <div class="contest-detail-content">7/23/2021 - 9:30PM</div>
          </div>
          <div class="contest-detail-header">
            Ends at
            <div class="contest-detail-content">7/27/2021 - 9:30PM</div>
          </div>
        </div>
      </div>

      <div className="conteststep1-container-right">
        <div class="scrolling-form-page page-1">
          <div class="contest-scrolling-page">
            <h5>Welcome!</h5>
            <p className="paragraph">
              Welcome to HackerRank's Celebrate National Disability Independence
              Day&nbsp;2021 Coding Challenge, a coding contest where your
              winnings help support a cause in need. Compete against top coders
              from around the world to give $500 to a U.S. charity that
              increases opportunities for people with disabilities.
            </p>

            <h5>Prizes</h5>
            <div className="rank">
              <p>1st place: Airpods Pro</p>
              <p>2nd place: Beats Solo3</p>
              <p>3rd place: Razer BlackWidow Gaming Keyboard</p>
            </div>

            <Button
              style={{ fontSize: 15, marginTop: "0.5rem" }}
              variant="contained"
            >
              Let's Begin!
            </Button>
          </div>
        </div>

        <div class="scrolling-form-page page-2">
          <div class="scrolling-form-page-section">
            <div class="scrolling-page">
              <h5>Registration Form</h5>
              <div className="paragraph">
                Logged in as <strong>krupalidevani22@gmail.com</strong>
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
                    style={{ padding: "0.5rem" }}
                    InputProps={{ style: { fontSize: 20 } }}
                    InputLabelProps={{ style: { fontSize: 15 } }}
                  />
                </div>

                <FormControl
                  required
                  style={{
                    marginTop: "0.5rem",
                    width: "6.5rem",
                    padding: "0.5rem",
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
                    padding: "0.5rem",
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
                    width: "7rem",
                    padding: "0.5rem",
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

                <FormControl
                  required
                  style={{
                    marginTop: "0.5rem",
                    width: "8.0rem",
                    padding: "0.5rem",
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
                    width: "8.0rem",
                    padding: "0.5rem",
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
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div class="scrolling-form-page page-2">
          <div class="scrolling-form-page-section form-3">
            <div class="scrolling-page">
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

              <Button
                style={{ fontSize: 15, marginTop: "0.5rem" }}
                variant="contained"
              >
                Try Sample Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest_Step_1;
