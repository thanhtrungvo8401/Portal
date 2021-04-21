import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  step2Study: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
    position: "absolute",
    zIndex: 2,
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
  },
}));

export default function Step2Study({ study, actionUpdate }) {
  const classes = useStyles();
  return <div className={classes.step2Study}>Programming...</div>;
}
