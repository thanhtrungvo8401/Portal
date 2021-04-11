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
      main: "#d2f4ea",
    },
    success: {
      main: "#20c997",
    },
    info: {
      main: "#ffc107", // bg-nav
    },
  },
});

export default theme;
