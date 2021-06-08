import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
    width: "100%"
  },
  typo: {
    fontWeight: "600",
    fontSize: "1rem"
  },
}));
export default function TitleItem({ children, hidden, style }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.root}>
      <Typography
        className={classes.typo}
        style={style}
        component="h3"
        variant="subtitle2"
        color="textSecondary"
      >
        {children}
      </Typography>
    </div>
  );
}