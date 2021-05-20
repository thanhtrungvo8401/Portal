import { makeStyles } from "@material-ui/core";
import Step5StudyUI from "./Step5StudyUI";
import { bgStep_X_Study } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  step5Study: bgStep_X_Study,
}));
export default function Step5Study({ study, actionUpdateBg }) {
  const classes = useStyles();
  return (
    <div className={classes.step5Study}>
      <Step5StudyUI study={study} actionUpdateBg={actionUpdateBg} />
    </div>
  );
}
