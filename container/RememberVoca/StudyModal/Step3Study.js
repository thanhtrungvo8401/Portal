import { makeStyles } from "@material-ui/core"
import Step3StudyUI from "./Step3Study_UI";
import { bgStep_X_Study } from "./StudyModal"

const useStyles = makeStyles(theme => ({
  Step3Study: bgStep_X_Study
}))

export default function Step3Study({ study, actionUpdateBg }) {
  const classes = useStyles();
  return <div className={classes.Step3Study} >
    <Step3StudyUI vocas={study.vocas} actionUpdateBg={actionUpdateBg} />
  </div>
}