import {
  AppBar,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HeaderLogic from "./HeaderLogic";
import "./MobileNavbar.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
  const { toggleDrawer, drawer, HomePageURL, dropdownURL } = HeaderLogic();

  return (
    <AppBar className="appbar" position="relative">
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
            <img src="images/logo4.png" alt="Logo" />
          </Link>
        </div>
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
          <List className="mobile-list-container">
            {HomePageURL.map((element, index) => {
              return (
                <ListItemButton
                  component={Link}
                  to={`/${element.URL}`}
                  className="mobile-list-button"
                  key={index}
                >
                  <p className="mobile-list-text">{element.name}</p>
                </ListItemButton>
              );
            })}
          </List>
          <Divider />
          <List className="mobile-list-container">
            {dropdownURL.map((element, index) => {
              return (
                <ListItemButton className="mobile-list-button" key={index}>
                  <p className="mobile-list-text">{element}</p>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default MobileNavbar;
