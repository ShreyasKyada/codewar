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

  const dropdownURL = ["Profile", "My playgroud", "Logout"];
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const { setShowLogin, activeTab } = useContext(loginContext);
  const { setValidUser } = useContext(authContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);

  const gotoLogin = () => {
    setShowLogin(true);
  };

  const logOut = () => {
    console.log("logOut");
    signOut(auth);
    setValidUser(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
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
    open,
    dropdownURL,
    toggleDrawer,
    drawer,
    toggleDarkMode,
    activeTab,
  };
};

export default HeaderLogic;
