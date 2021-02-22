import { grey, red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[200],
    },
    // info: {
    //   main: grey[100],
    // },
    text: {
      primary: grey[900],
      secondary: grey[700]
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
