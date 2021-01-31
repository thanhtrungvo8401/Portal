import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import MyLink from "../../components/MyLink";
const useStyles = makeStyles((theme) => ({
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
      backgroundColor: theme.palette.info.light,
    },
  },
  container: {
    padding: 0,
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
      <Container className={classes.container} component="main" maxWidth="xs">
        <DialogContent>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
