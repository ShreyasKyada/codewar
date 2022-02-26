import React, { useContext } from "react";
import LogIn from "../LogIn_SignUp/LogIn";
import { loginContext } from "../../Context/LoginContext";
import { authContext } from "../../Context/AuthContext";
import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { themeContext } from "../../Context/ThemeContext";
import "./Header.css";

const Header = () => {
  const {
    showLogin,
    isLoadingState,
    showHeaderSnackbar,
    setShowHeaderSnackbar,
    headerErrorText,
    severity,
    isShowNavbar,
  } = useContext(loginContext);
  const { validUser } = useContext(authContext);
  const { isDarkMode } = useContext(themeContext);

  const mobileView = useMediaQuery("(min-width:600px)");

  const hideSnackbar = () => {
    setShowHeaderSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={showHeaderSnackbar}
        autoHideDuration={4000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="snackbar-header"
      >
        {severity === "error" ? (
          <Alert
            severity="error"
            variant="filled"
            className="alert snackbar-alert"
          >
            {headerErrorText}
          </Alert>
        ) : (
          <Alert
            severity="success"
            variant="filled"
            className="alert snackbar-alert"
          >
            {headerErrorText}
          </Alert>
        )}
      </Snackbar>

      {isShowNavbar && (
        <>
          {showLogin ? <LogIn /> : ""}
          {!mobileView ? (
            <MobileNavbar />
          ) : (
            <DesktopNavbar
              validUser={validUser}
              isDarkMode={isDarkMode}
              isLoadingState={isLoadingState}
            />
          )}
        </>
      )}
      {/* <LinearProgress /> */}
    </>
  );
};

export default Header;
