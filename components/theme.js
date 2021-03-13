import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: "#f1f4f6",
      main: "#fafbfc",
      // dark: "#ffffff"
    },
    secondary: {
      main: "#444054",
    },
    text: {
      primary: "#444054",
      secondary: "#757575",
    },
    info: {
      main: "#3c763d",
    },
    error: {
      main: red.A400,
    },
    background: {
      main: "#f1f4f6"
    }
  },
});

export default theme;
