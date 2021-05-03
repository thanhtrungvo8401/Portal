import { makeStyles } from "@material-ui/core";
import { styleStep_X_StudyUI } from "./StudyModal";

// MAIN UI
const useStyles = makeStyles((theme) => ({
  Step3StudyUI: styleStep_X_StudyUI,
}));

export default function Step3StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
  return <div className={classes.Step3StudyUI}>Step 3 Study UI</div>;
}
