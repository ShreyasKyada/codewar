import React from "react";
import LoginLogic from "./LogInLogic";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { Alert, Button, Snackbar, Tab, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import googleIcon from "../../Assets/google-vector.svg";
import facebookIcon from "../../Assets/facebook-vector.svg";

const LogIn = () => {
  const {
    tabValue,
    handleChange,
    height,
    signUpDataFun,
    signUpBtnFun,
    errorText,
    showSnackbar,
    hideSnackbar,
    loginFun,
    getLoginData,
    isLoadingState,
    googleSignIn,
  } = LoginLogic();

  return (
    <div className="login-page" style={{ height: height }}>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" className="alert">
          {errorText}
        </Alert>
      </Snackbar>

      <div className="login-signup-container">
        <TabContext value={tabValue}>
          <TabList onChange={handleChange}>
            <Tab className="tab" value="0" label="Sign up" />
            <Tab className="tab" value="1" label="Log in" />
          </TabList>
          {/* sign up */}
          <TabPanel value="0">
            <div className="login-container">
              <TextField
                className="signup-text-field"
                variant="standard"
                label="First & Last name"
                onChange={signUpDataFun}
                name="username"
                color="primary"
              />
              <TextField
                className="signup-text-field"
                variant="standard"
                label="Email"
                type="email"
                onChange={signUpDataFun}
                name="email"
                color="primary"
              />
              <TextField
                className="signup-text-field"
                variant="standard"
                label="Your password"
                onChange={signUpDataFun}
                name="password"
                type="password"
                color="primary"
              />
              <Button
                className="login-btn"
                variant="contained"
                onClick={signUpBtnFun}
                disabled={isLoadingState ? true : false}
              >
                Sign up
              </Button>
            </div>
          </TabPanel>
          {/* Sign in */}
          <TabPanel value="1">
            <div className="login-container">
              <TextField
                className="login-text-field"
                variant="standard"
                label="Your email"
                name="email"
                onChange={getLoginData}
              />
              <TextField
                className="login-text-field"
                variant="standard"
                label="Your password"
                name="password"
                type="password"
                onChange={getLoginData}
              />
              <Link to="/" className="forgot-password">
                Forgot your password?
              </Link>
              <Button
                className="login-btn"
                variant="contained"
                onClick={loginFun}
                disabled={isLoadingState ? true : false}
              >
                Log In
              </Button>
            </div>
          </TabPanel>
        </TabContext>
        <p className="separator">OR</p>
        <div className="login-options-container">
          <Button
            variant="outlined"
            className="google-btn"
            onClick={googleSignIn}
          >
            <img src={googleIcon} className="google-logo" alt="logo" />
            Log in with Google
          </Button>
          <Button variant="outlined" className="facebook-btn">
            <img src={facebookIcon} className="facebook-logo" alt="logo" />
            Log in with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
