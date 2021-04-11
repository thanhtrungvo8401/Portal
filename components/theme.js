import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d6efd",
    },
    secondary: {
      main: "#343a40",
    },
    text: {
      primary: "#212529",
      secondary: "#495057",
    },
    warning: {
      main: "#fd7e14",
    },
    error: {
      main: "#dc3545",
    },
    background: {
      main: "#e9ecef",
    },
    success: {
      main: "#20c997",
    },
    info: {
      main: "#ffda6a", // bg-nav
      light: "#fff3cd", // bg-popup
    },
  },
});

export default theme;
