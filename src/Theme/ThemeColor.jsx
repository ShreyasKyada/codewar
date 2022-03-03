import { createTheme } from "@mui/material";

const ThemeColor = (mode) => {
  // const lightTheme = createTheme({
  //   palette: {
  //     mode: "light",
  //     primary: {
  //       main: "#f44336",
  //       light: "#f44336",
  //       dark: "#f44336",
  //       contrastText: "white",
  //     },
  //   },
  // });

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //     primary: {
  //       main: "#32a852",
  //       light: "#00ff44",
  //       dark: "#3c6647",
  //       contrastText: "white",
  //     },
  //   },
  // });

  return createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      primary: {
        main: "#03cffc",
        light: "#01D8FD",
        dark: "#01D8FD",
        contrastText: "black",
      },
      // primary: {
      //   main: "#03cffc",
      //   light: "#3ed8fa",
      //   dark: "#00b8e0",
      //   contrastText: "black",
      // },
    },
  });
};

export default ThemeColor;
