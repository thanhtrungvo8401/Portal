import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
  typo: {
    fontWeight: "400",
  },
}));
export default function TitleBody({ children, hidden }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.root}>
      <Typography
        className={classes.typo}
        variant="h6"
        component="h2"
        color="textSecondary"
      >
        {children}
      </Typography>
    </div>
  );
}