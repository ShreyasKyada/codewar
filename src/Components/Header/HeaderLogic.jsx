import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { authContext } from "../../Context/AuthContext";
import { loginContext } from "../../Context/LoginContext";
import { auth } from "../../Firebase/Firebase";
import { themeContext } from "../../Context/ThemeContext";

const HeaderLogic = () => {
  const HomePageURL = [
    { name: "Purpose", URL: "home" },
    { name: "Dashboard", URL: "dashboard" },
    { name: "Certify", URL: "certificate" },
    { name: "Contest", URL: "contest" },
    { name: "Vs Mode", URL: "vsmode" },
  ];

  const [drawer, setDrawer] = useState(false);

  const { setShowLogin, activeTab } = useContext(loginContext);
  const { setValidUser } = useContext(authContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(false);

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
    // console.log("logOut");
    signOut(auth);
    setValidUser(false);
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
  };
};

export default HeaderLogic;
