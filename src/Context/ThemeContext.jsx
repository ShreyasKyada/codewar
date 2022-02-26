import { createTheme } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import ThemeColor from "../Theme/ThemeColor";

export const themeContext = createContext();

const ThemeContext = ({ children }) => {
  // if isDarkMode is true then dark mode is enable
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const Theme = ThemeColor(isDarkMode);

  // const Theme = createTheme({
  //   palette: {
  //     mode: isDarkMode ? "dark" : "light",
  //     primary: {
  //       main: "#03cffc",
  //       light: "#3ed8fa",
  //       dark: "#00b8e0",
  //       contrastText: "black",
  //     },
  //   },
  // });

  return (
    <themeContext.Provider value={{ isDarkMode, setIsDarkMode, Theme }}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </themeContext.Provider>
  );
};

export default ThemeContext;
