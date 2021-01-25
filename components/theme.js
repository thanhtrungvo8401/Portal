import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
    primary: {
      main: red[700],
    },
    error: {
      main: red[400],
    },
  },
});

export default theme;
