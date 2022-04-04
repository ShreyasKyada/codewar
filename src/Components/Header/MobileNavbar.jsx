import {
  AppBar,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HeaderLogic from "./HeaderLogic";
import "./MobileNavbar.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import { BsMoon } from "react-icons/bs";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const MobileNavbar = ({ validUser, isDarkMode, isLoadingState }) => {
  const {
    toggleDrawer,
    drawer,
    HomePageURL,
    logOut,
    gotoLogin,
    gotoPlayground,
    gotoProfile,
    toggleDarkMode,
    activeTab,
  } = HeaderLogic();

  return (
    <AppBar className="appbar" position="relative">
      <div className="progressbar-container">
        {isLoadingState ? <LinearProgress /> : ""}
      </div>
      {drawer ? (
        <CloseRoundedIcon
          onClick={toggleDrawer(false)}
          className="mobile-bars"
        />
      ) : (
        <MenuRoundedIcon onClick={toggleDrawer(true)} className="mobile-bars" />
      )}

      <div className="logo-container">
        <div className="header-logo-mobile">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <div className="theme-icons-container">
        {isDarkMode ? (
          <BsMoon className="theme-icon-moon" onClick={toggleDarkMode} />
        ) : (
          <LightModeOutlinedIcon
            className="theme-icon"
            onClick={toggleDarkMode}
          />
        )}
      </div>
      <Drawer
        className="drawer"
        anchor={"left"}
        variant="temporary"
        open={drawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          className="drawer-box"
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {validUser && (
            <>
              <List className="mobile-list-container">
                {HomePageURL.map((element, index) => {
                  return (
                    <ListItemButton
                      component={Link}
                      to={`/${element.URL}`}
                      className={
                        activeTab === element.name
                          ? "mobile-list-button mobile-active-tab"
                          : "mobile-list-button"
                      }
                      key={index}
                    >
                      <p className="mobile-list-text">{element.name}</p>
                    </ListItemButton>
                  );
                })}
              </List>
              <Divider />
            </>
          )}
          <List className="mobile-list-container">
            {validUser && (
              <>
                <ListItemButton className="mobile-list-button">
                  <p className="mobile-list-text" onClick={gotoProfile}>
                    Profile
                  </p>
                </ListItemButton>
                <ListItemButton
                  className="mobile-list-button"
                  onClick={gotoPlayground}
                >
                  <p className="mobile-list-text">My playgroud</p>
                </ListItemButton>
              </>
            )}
            {!validUser ? (
              <ListItemButton
                className="mobile-list-button list-signin-btn"
                disableRipple
              >
                <Button
                  variant="contained"
                  className="btn list-singin-main-btn"
                  color="primary"
                  onClick={gotoLogin}
                >
                  Sign in
                </Button>
              </ListItemButton>
            ) : (
              <ListItemButton className="mobile-list-button" onClick={logOut}>
                <p className="mobile-list-text">Logout</p>
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default MobileNavbar;
