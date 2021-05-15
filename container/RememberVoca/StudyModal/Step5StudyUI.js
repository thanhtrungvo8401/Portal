import { makeStyles } from "@material-ui/core";
import { styleStep_X_StudyUI } from "./StudyModal";

const useStyles = makeStyles(theme => ({
  Step5StudyUI: styleStep_X_StudyUI
}))

export default function Step5StudyUI() {
  const classes = useStyles();
  return <section className={classes.Step5StudyUI}>
    <h1>Step 5 Study UI</h1>
  </section>
}
