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
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoon } from "react-icons/bs";

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
          <p className="list-item-text">shreyas</p>
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
              Score: 5000
            </Button>
          </MenuItem>
          <MenuItem onClick={handleClose} className="list-button">
            <p className="list-text">Profile</p>
          </MenuItem>
          <MenuItem onClick={handleClose} className="list-button">
            <p className="list-text">My playgroud</p>
          </MenuItem>
          <MenuItem onClick={handleClose} className="list-button">
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
            src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/logo6.png?alt=media&token=f4888329-9045-4048-aff5-c6437090971d"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="appbar-tab">
        {/* <Link key={index} to={`/${element.URL}`} className="appbar-links"> */}
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
          <QueuePlayNextOutlinedIcon className="playground-icon" />
        </div>
        <div className="search-box-container">
          {/* searchbox design */}
          <div className="search-box-icon-container">
            <div className="search-icon-container">
              {/* <SearchOutlinedIcon className="search-icon" /> */}
              <AiOutlineSearch className="search-icon" />
            </div>
            <input className="search-box" type="text" placeholder="Search..." />
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
