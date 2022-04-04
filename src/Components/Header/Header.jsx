import React, { useContext, useEffect } from "react";
import LogIn from "../LogIn_SignUp/LogIn";
import { loginContext } from "../../Context/LoginContext";
import { authContext } from "../../Context/AuthContext";
import {
  Alert,
  Dialog,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { themeContext } from "../../Context/ThemeContext";
import "./Header.css";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const {
    showLogin,
    setShowLogin,
    isLoadingState,
    showHeaderSnackbar,
    setShowHeaderSnackbar,
    headerErrorText,
    severity,
    isShowNavbar,
    setActiveTab,
  } = useContext(loginContext);
  const { validUser } = useContext(authContext);
  const { isDarkMode } = useContext(themeContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const mobileView = useMediaQuery("(min-width:600px)");

  const hideSnackbar = () => {
    setShowHeaderSnackbar(false);
  };

  useEffect(() => {
    setActiveTab("Dashboard");
  }, []);

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
          <Dialog
            open={showLogin}
            fullScreen={fullScreen}
            onClose={() => setShowLogin(false)}
          >
            <i
              onClick={() => {
                setShowLogin(false);
              }}
              className="close-icon-container"
            >
              <CloseIcon className="close-icon" />
            </i>
            <LogIn />
          </Dialog>

          {!mobileView ? (
            <MobileNavbar
              validUser={validUser}
              isDarkMode={isDarkMode}
              isLoadingState={isLoadingState}
            />
          ) : (
            <DesktopNavbar
              validUser={validUser}
              isDarkMode={isDarkMode}
              isLoadingState={isLoadingState}
            />
          )}
        </>
      )}
    </>
  );
};

export default Header;
