import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { authContext } from "../../Context/AuthContext";
import { loginContext } from "../../Context/LoginContext";
import appRef, { auth } from "../../Firebase/Firebase";
import { themeContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const HeaderLogic = () => {
  const { setValidUser, validUser, score } = useContext(authContext);
  const { setShowLogin, activeTab } = useContext(loginContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);
  const [drawer, setDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const [searchBoxData, setSearchBoxData] = useState({});
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
    HomePageURL = [{}];
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

  const searchingInQuestion = (event) => {
    if (event.target.value) {
      appRef
        .child("languages_questions")
        .get()
        .then(async (snapshot) => {
          const snap = snapshot.val();
          let tempArr = {};
          Object.keys(snap).map((value) => {
            let langName = value;
            Object.keys(snap[value]).map((id) => {
              if (
                snap[value][id].question_heading
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase())
              ) {
                tempArr = {
                  ...tempArr,
                  [id]: {
                    heading: snap[value][id].question_heading,
                    languageName: langName,
                  },
                };
              }
            });
            setSearchBoxData(tempArr);
          });
        });
    } else setSearchBoxData({});
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
    isOpenSearchBox,
    searchingInQuestion,
    setIsOpenSearchBox,
    searchBoxData,
  };
};

export default HeaderLogic;
