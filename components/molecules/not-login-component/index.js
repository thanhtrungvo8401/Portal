import { Box, Button, Container, makeStyles, Typography, } from "@material-ui/core";
import { showLoginForm } from "utils/Helper";

const useStyles = makeStyles((theme) => {
  return {
    loginBtn: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(5),
    },
  };
});

export default function NotLoginComponent(props) {
  const classes = useStyles();
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
