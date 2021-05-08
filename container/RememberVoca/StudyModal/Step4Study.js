import { makeStyles } from "@material-ui/core";
import Step4StudyUI from "./Step4StudyUI";
import { bgStep_X_Study } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  step4Study: bgStep_X_Study,
}));
export default function Step4Study({ study, actionUpdateBg }) {
  const classes = useStyles();
  return (
    <div className={classes.step4Study}>
      <Step4StudyUI study={study} actionUpdateBg={actionUpdateBg} />
    </div>
  );
}
