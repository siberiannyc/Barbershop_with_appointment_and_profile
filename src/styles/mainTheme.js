import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2C394B",
    },
    secondary: {
      main: "#374543",
    },
    accent: {
      main: "#D65032",
      contrastText: "#fff",
    },
    info: {
      main: "#d9edfc",
    },
    success: {
      main: "#4FA142",
    },
    error: {
      main: "#C93A3A",
    },
    warning: {
      main: "#DBC12E",
    },
  },
  typography: {
    fontFamily: "Lato",
    primary: {
      fontFamily: "Lato",
    },
    secondary: {
      fontFamily: "Cairo",
    },
  },
});
