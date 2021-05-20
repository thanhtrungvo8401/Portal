import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#59359a",
    },
    secondary: {
      main: "#343a40",
    },
    text: {
      primary: "#212529",
      secondary: "#495057",
    },
    warning: {
      main: "#ffc107",
    },
    error: {
      main: "#dc3545",
    },
    background: {
      main: "rgb(228 227 255)",
    },
    success: {
      main: "#198754",
    },
    info: {
      main: "#59359a", // bg-nav
      light: "#e0cffc", // bg-popup
    },
    white: {
      main: "#FFFFFF",
    },
  },
  opacity: {
    '2': "0.2",
    '5': "0.5",
    '8': "0.8",
  }
});

export default theme;
