import React from "react";
import "./DesktopNavbar.css";
import HeaderLogic from "./HeaderLogic";
import {
  AppBar,
  Button,
  LinearProgress,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import QueuePlayNextOutlinedIcon from "@mui/icons-material/QueuePlayNextOutlined";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsMoon } from "react-icons/bs";
import { auth } from "../../Firebase/Firebase";

const DesktopNavbar = ({ validUser, isDarkMode, isLoadingState }) => {
  const {
    HomePageURL,
    gotoLogin,
    handleClose,
    handleClick,
    open,
    toggleDarkMode,
    activeTab,
    anchorEl,
    logOut,
    gotoPlayground,
    gotoProfile,
    score,
    searchingInQuestion,
    isOpenSearchBox,
    setIsOpenSearchBox,
    searchBoxData,
  } = HeaderLogic();

  const userprofileAndDropDown = () => {
    // top right corner profile view block
    return (
      <>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          className="list-item-btn"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          disableRipple={true}
        >
          <ListItemIcon className="list-item-icon">
            <PersonOutlineIcon className="person-icon" />
          </ListItemIcon>
          <p className="list-item-text">{auth.currentUser.displayName}</p>
          {open ? (
            <ExpandLess className="expand-less-icon" />
          ) : (
            <ExpandMore className="expand-less-icon" />
          )}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="list"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleClose} className="list-button" disableRipple>
            <Button variant="contained" color="primary" className="score-btn">
              Score: {score}
            </Button>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              gotoProfile();
            }}
            className="list-button"
          >
            <p className="list-text">Profile</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              gotoPlayground();
            }}
            className="list-button"
          >
            <p className="list-text">My playgroud</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              logOut();
            }}
            className="list-button"
          >
            <p className="list-text">Logout</p>
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    // main appbar start here
    <AppBar position="sticky" className="appbar">
      <div className="progressbar-container">
        {isLoadingState ? <LinearProgress /> : ""}
      </div>
      <div className="header-logo">
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="appbar-tab">
        {HomePageURL.map((element, index) => {
          return (
            <Link
              key={index}
              to={`/${element.URL}`}
              className={
                activeTab === element.name
                  ? "appbar-links active-tab"
                  : "appbar-links"
              }
            >
              {element.name}
            </Link>
          );
        })}
      </div>

      <div className="searchbox-theme-playground-container">
        <div className="icon-container">
          {/* Dark mode icon toggle */}
          {isDarkMode ? (
            <BsMoon className="theme-icon-moon" onClick={toggleDarkMode} />
          ) : (
            <LightModeOutlinedIcon
              className="theme-icon"
              onClick={toggleDarkMode}
            />
          )}
        </div>
        <div className="icon-container">
          {/* Playground icon */}
          <QueuePlayNextOutlinedIcon
            className={
              activeTab === "playground"
                ? "playground-icon active-tab"
                : "playground-icon"
            }
            onClick={gotoPlayground}
          />
        </div>
        <div className="search-box-container">
          {/* searchbox design */}
          <div className="search-box-icon-container">
            <div className="search-icon-container">
              {/* <SearchOutlinedIcon className="search-icon" /> */}
              <AiOutlineSearch className="search-icon" />
            </div>
            {isOpenSearchBox && (
              <div className="search-result-box">
                <div>
                  <AiOutlineClose
                    className="search-close-icon"
                    onClick={() => setIsOpenSearchBox(false)}
                  />
                </div>
                {Object.keys(searchBoxData).length > 0 ? (
                  Object.keys(searchBoxData).map((id) => {
                    return (
                      <Link
                        to={`question-show/${searchBoxData[id].languageName}/${id}`}
                        className="router-links"
                        key={id}
                        onClick={() => setIsOpenSearchBox(false)}
                      >
                        <p>{searchBoxData[id].heading}</p>
                      </Link>
                    );
                  })
                ) : (
                  <h2 style={{ textAlign: "center" }}>Nothing to show..</h2>
                )}
              </div>
            )}
            <input
              className="search-box"
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                searchingInQuestion(event);
              }}
              onFocus={() => setIsOpenSearchBox(true)}
            />
          </div>
        </div>
      </div>
      <div className="btn-container">
        {validUser ? (
          <>{userprofileAndDropDown()}</>
        ) : (
          <Button
            variant="outlined"
            className="btn"
            color="primary"
            onClick={gotoLogin}
          >
            Sign in
          </Button>
        )}
      </div>
    </AppBar>
  );
};

export default DesktopNavbar;
