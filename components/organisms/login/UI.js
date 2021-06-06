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
import InputsGroup, { validForm } from "components/molecules/inputs-group";
import MyLink from "components/atoms/my-link";
import theme from "components/theme";
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
      // backgroundColor: theme.palette.info.light,
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
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
export default function LoginUI(props) {
  const isLoading = useSelector((state) => state.isLoading);
  const { showLogin, user, ERROR } = props;
  const classes = useStyles();
  const isValidSubmit = validForm(user, inputRequired, ERROR);
  return (
    <Dialog
      style={{ zIndex: 500 }}
      open={showLogin}
      // onClose={props.handleCloseLogin}
      className={`${classes.dialog} ${isLoading ? classes.zindex500 : ""}`}
    >
      <IconButton className={classes.closeBtn} onClick={props.handleCloseLogin}>
        <HighlightOffIcon color="primary" fontSize="large" />
      </IconButton>
      <Container className={classes.container} component="main" maxWidth="xs">
        <DialogContent>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon style={{ color: theme.palette.white.main }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <InputsGroup
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
              <MyLink variant="caption" url="#">
                Forgot password?
              </MyLink>
            </Grid>
            <Grid item xs>
              <MyLink variant="caption" url="/sign-up">
                Don't have an account? Sign Up
              </MyLink>
            </Grid>
          </Grid>
        </DialogContent>
      </Container>
    </Dialog>
  );
}