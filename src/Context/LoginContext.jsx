import React, { createContext, useState } from "react";

export const loginContext = createContext();

const LoginContext = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [headerErrorText, setHeaderErrorText] = useState("");
  const [showHeaderSnackbar, setShowHeaderSnackbar] = useState(false);
  const [severity, setSeverity] = useState("");
  const [isShowNavbar, setIsShowNavbar] = useState(true);
  const [activeTab, setActiveTab] = useState("");

  const setSnackbarData = (errorText, typeOfSnackbar) => {
    setShowHeaderSnackbar(true);
    setHeaderErrorText(errorText);
    setSeverity(typeOfSnackbar);
  };

  return (
    <>
      <loginContext.Provider
        value={{
          showLogin,
          setShowLogin,
          isLoadingState,
          setIsLoadingState,
          headerErrorText,
          showHeaderSnackbar,
          severity,
          setSnackbarData,
          setShowHeaderSnackbar,
          isShowNavbar,
          setIsShowNavbar,
          activeTab,
          setActiveTab,
        }}
      >
        {children}
      </loginContext.Provider>
    </>
  );
};

export default LoginContext;
