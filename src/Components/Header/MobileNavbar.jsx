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

const MobileNavbar = ({ validUser }) => {
  const { toggleDrawer, drawer, HomePageURL, logOut, gotoLogin } =
    HeaderLogic();

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
            <img
              src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/logo6.png?alt=media&token=f4888329-9045-4048-aff5-c6437090971d"
              alt="Logo"
            />
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
            <ListItemButton className="mobile-list-button">
              <p className="mobile-list-text">Profile</p>
            </ListItemButton>
            <ListItemButton className="mobile-list-button">
              <p className="mobile-list-text">My playgroud</p>
            </ListItemButton>
            {!validUser ? (
              <ListItemButton className="mobile-list-button list-signin-btn" disableRipple>
                <Button
                  variant="outlined"
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
