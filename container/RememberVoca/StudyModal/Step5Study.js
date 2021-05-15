import { makeStyles } from "@material-ui/core";
import Step5StudyUI from "./Step5StudyUI";
import { bgStep_X_Study } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  Step5Study: bgStep_X_Study,
}));
export default function Step5Study() {
  const classes = useStyles();
  return (
    <div className={classes.Step5Study} >
      <Step5StudyUI />
    </div>
  )
}
