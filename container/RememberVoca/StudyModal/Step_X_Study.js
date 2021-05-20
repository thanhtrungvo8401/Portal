import { makeStyles } from "@material-ui/core"
import Step_X_StudyUI from "./Step_X_Study_UI";
import { bgStep_X_Study } from "./StudyModal"

const useStyles = makeStyles(theme => ({
  Step3Study: bgStep_X_Study
}))

export default function Step_X_Study({ study, actionUpdateBg }) {
  const classes = useStyles();
  return <div className={classes.Step3Study} >
    <Step_X_StudyUI vocas={study.vocas} actionUpdateBg={actionUpdateBg} />
  </div>
}