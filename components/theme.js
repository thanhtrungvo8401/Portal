import { grey, red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[700],
    },
    secondary: {
      main: grey[100],
    },
    text: {
      primary: grey[700],
      secondary: grey[500],
    },
    // info: {
    //   main: grey[100],
    // },
    error: {
      main: red.A400,
    }
  },
});

export default theme;
