import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  step2Study: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
  },
}));

export default function Step2Study({ study, actionUpdate }) {
  const classes = useStyles();
  return <div className={classes.step2Study}>Programming...</div>;
}
