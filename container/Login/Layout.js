import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import MyLink from "../../components/MyLink";
const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper": {
      backgroundColor: theme.palette.info.light,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));
function LoginLayout(props) {
  const { showLogin } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={showLogin}
      onClose={props.handleCloseLogin}
      className={classes.dialog}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>

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
              url="#"
              color="primary"
              className={classes.link}
            >
              Don't have an account? Sign Up
            </MyLink>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default LoginLayout;
