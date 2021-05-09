import { makeStyles } from "@material-ui/core";
import React from "react";
import Step3StudyUI from "./Step3StudyUI";
import { bgStep_X_Study } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  step3Study: bgStep_X_Study,
}));

export default function Step3Study({ study, hidden, actionUpdateBg }) {
  const classes = useStyles();

  return (
    <div hidden={hidden} className={classes.step3Study}>
      <Step3StudyUI study={study} actionUpdateBg={actionUpdateBg} />
    </div>
  );
}
