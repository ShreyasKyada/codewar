import React from "react";
import "./DesktopNavbar.css";
import HeaderLogic from "./HeaderLogic";
import {
  AppBar,
  Button,
  Collapse,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
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
    handleClick,
    open,
    dropdownURL,
    toggleDarkMode,
    activeTab,
  } = HeaderLogic();

  const userprofileAndDropDown = () => {
    // top right corner profile view block
    return (
      <>
        <ListItemButton
          className="list-item-btn"
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
        </ListItemButton>
        <Collapse in={open} className="collapse" timeout="auto" unmountOnExit>
          <List className="list" component="div" disablePadding>
            <ListItemButton className="list-button" disableRipple={true}>
              <Button variant="contained" color="primary" className="score-btn">
                Score: 5000
              </Button>
            </ListItemButton>
            {dropdownURL.map((data, index) => {
              return (
                <ListItemButton key={index} className="list-button">
                  <p className="list-text">{data}</p>
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
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
