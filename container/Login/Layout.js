import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useSelector } from "react-redux";
import InputGroup, { validForm } from "../../components/InputGroup";
import MyLink from "../../components/MyLink";
const useStyles = makeStyles((theme) => ({
  zindex500: {
    zIndex: "500!important",
  },
  dialog: {
    "& .MuiDialogContent-root": {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& .MuiTypography-root": {
        width: "100%",
        textAlign: "center",
      },
    },
    "& .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  closeBtn: {
    position: "absolute",
    width: "auto",
    right: 0,
    top: 0,
  },
  container: {
    padding: 0,
  },
  rememberMe: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    "& span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1": {
      textAlign: "left!important",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.dark,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));
const inputFields = ["email", "password"];
const inputTypes = {
  email: "input",
  password: "input",
};
const inputLabels = {
  email: "Email Address",
  password: "Password",
};
const inputRequired = ["email", "password"];
function LoginLayout(props) {
  const isLoading = useSelector((state) => state.isLoading);
  const { showLogin, user, ERROR } = props;
  const classes = useStyles();
  const isValidSubmit = validForm(user, inputRequired, ERROR);
  return (
    <Dialog
      open={showLogin}
      // onClose={props.handleCloseLogin}
      className={`${classes.dialog} ${isLoading ? classes.zindex500 : ""}`}
    >
      <IconButton className={classes.closeBtn} onClick={props.handleCloseLogin}>
        <HighlightOffIcon color="error" fontSize="large" />
      </IconButton>
      <Container className={classes.container} component="main" maxWidth="xs">
        <DialogContent>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <InputGroup
            ERROR={ERROR}
            inputFields={inputFields}
            inputTypes={inputTypes}
            inputLabels={inputLabels}
            inputRequired={inputRequired}
            object={user}
            handleOnChange={props.handleOnChange}
            handleOnSubmit={props.handleOnSubmit}
          />
          <FormControlLabel
            className={classes.rememberMe}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            className={classes.submit}
            type="btn"
            variant="contained"
            color="primary"
            onClick={props.handleOnSubmit}
            disabled={!isValidSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <MyLink
                variant="caption"
                url="#"
                color="primary"
                className={classes.link}
              >
                Forgot password?
              </MyLink>
            </Grid>
            <Grid item xs>
              <MyLink
                variant="caption"
                url="/sign-up"
                color="primary"
                className={classes.link}
              >
                Don't have an account? Sign Up
              </MyLink>
            </Grid>
          </Grid>
        </DialogContent>
      </Container>
    </Dialog>
  );
}

export default LoginLayout;
