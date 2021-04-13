import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3d0a91",
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
      main: "#f8f9fa",
    },
    success: {
      main: "#198754",
    },
    info: {
      main: "#6f42c1", // bg-nav
      light: "#e0cffc", // bg-popup
    },
    white: {
      main: "#FFFFFF",
    },
  },
});

export default theme;
