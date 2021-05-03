import { makeStyles } from "@material-ui/core";
import { bgStepXStudy } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  step3Study: bgStepXStudy,
}));

export default function Step3Study({ study, hidden }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.step3Study}>
      STEP 3 STUDY
    </div>
  );
}
