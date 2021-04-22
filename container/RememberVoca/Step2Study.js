import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  step2Study: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
    zIndex: 0,
    position: "relative",
  },
}));

export default function Step2Study({ study, actionUpdate, hidden }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.step2Study}>
      Programming...
    </div>
  );
}
