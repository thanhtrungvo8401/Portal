import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffff99",
    },
    secondary: {
      main: "#17161d",
    },
    text: {
      primary: "#17161d",
      secondary: "#696969",
    },
    info: {
      main: "#3c763d",
    },
    error: {
      main: red.A400,
    },
    background: {
      main: "#F5F5F5",
    },
  },
});

export default theme;
