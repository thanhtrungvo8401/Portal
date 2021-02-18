import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { isLogined, showLoginForm } from "../../utils/Helper";
import { withLayout } from "./Layout";
export const withPrivateLayout = (Component, propsPages) => {
  const _isLogined = isLogined();
  return _isLogined
    ? withLayout(Component, propsPages)
    : withLayout(NotLoginComponent, propsPages);
};

const useStyles = makeStyles((theme) => {
  return {
    loginBtn: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(5),
    },
  };
});

function NotLoginComponent(props) {
  const classes = useStyles();
  // LIFE CYCLE HOOK:
  useEffect(() => {
    showLoginForm();
  }, []);
  return (
    <Container>
      <Typography variant="h4" color="error">
        Not allowed
      </Typography>
      <Typography variant="body1" color="error">
        To access to this page, you must login to Neko-kun
      </Typography>
      <Box className={classes.loginBtn}>
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={() => showLoginForm()}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
