import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { authContext } from "../../Context/AuthContext";
import { loginContext } from "../../Context/LoginContext";
import { auth } from "../../Firebase/Firebase";
import { themeContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const HeaderLogic = () => {
  const { setValidUser, validUser, score } = useContext(authContext);
  const { setShowLogin, activeTab } = useContext(loginContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);
  const [drawer, setDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let HomePageURL = [];

  if (validUser) {
    HomePageURL = [
      { name: "Dashboard", URL: "dashboard" },
      { name: "Certify", URL: "certificate" },
      { name: "Contest", URL: "contest" },
      { name: "Vs Mode", URL: "vsmode" },
    ];
  } else {
    HomePageURL = [{ }];
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(!open);
  };

  const gotoLogin = () => {
    setShowLogin(true);
  };

  const logOut = () => {
    signOut(auth);
    setValidUser(false);
    navigate("/");
  };

  const gotoPlayground = () => {
    navigate("/playground");
  };

  const gotoProfile = () => {
    navigate("/user/profile");
  };

  const toggleDrawer = (openDrawer) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(openDrawer);
  };

  const toggleDarkMode = () => {
    if (isDarkMode) setIsDarkMode(false);
    else setIsDarkMode(true);
  };

  return {
    HomePageURL,
    gotoLogin,
    logOut,
    handleClick,
    handleClose,
    open,
    toggleDrawer,
    drawer,
    toggleDarkMode,
    activeTab,
    anchorEl,
    gotoPlayground,
    gotoProfile,
    score,
  };
};

export default HeaderLogic;
