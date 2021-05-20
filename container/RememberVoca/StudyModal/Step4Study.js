import { makeStyles } from "@material-ui/core";
import React from "react";
import Step4StudyUI from "./Step4StudyUI";
import { bgStep_X_Study } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  step4Study: bgStep_X_Study,
}));

export default function Step4Study({ study, hidden, actionUpdateBg }) {
  const classes = useStyles();

  return (
    <div hidden={hidden} className={classes.step4Study}>
      <Step4StudyUI study={study} actionUpdateBg={actionUpdateBg} />
    </div>
  );
}
