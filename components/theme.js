import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fafbfc",
      dark: "rgb(226,229,231)"
    },
    secondary: {
      main: "#17161d",
    },
    text: {
      primary: "#17161d",
      secondary: "#757575",
    },
    info: {
      main: "#3c763d",
    },
    error: {
      main: red.A400,
    },
    background: {
      main: "rgb(226,229,231)"
    }
  },
});

export default theme;
