import { makeStyles } from "@material-ui/core";
import Step2StudyUI from "./Step2StudyUI";

const useStyles = makeStyles((theme) => ({
  step2Study: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    margin: "0 auto",
    zIndex: 0,
    position: "absolute",
    backgroundImage: `linear-gradient(to left top, #ffffff, #e9e4fb, #d4caf7, #c1aff1, #ae94ea, #ae94ea, #ae94ea, #ae94ea, #c1aff1, #d4caf7, #e9e4fb, #ffffff)`,
  },
}));

export default function Step2Study({ study, hidden, actionUpdate }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.step2Study}>
      <Step2StudyUI actionUpdate={actionUpdate} study={study} />
    </div>
  );
}
