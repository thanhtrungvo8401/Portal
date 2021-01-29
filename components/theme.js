import { grey, red, yellow } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: grey[900],
    },
    primary: {
      main: yellow[700],
    },
    error: {
      main: red[400],
    },
    info: {
      main: yellow[200],
    },
  },
});

export default theme;
