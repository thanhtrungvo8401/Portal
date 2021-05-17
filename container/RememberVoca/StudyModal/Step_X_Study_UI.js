import { makeStyles } from "@material-ui/core";
import React from "react";
import { styleStep_X_StudyUI } from "./StudyModal";


const useStyles = makeStyles(theme => ({
  Step3StudyUI: styleStep_X_StudyUI
}))

export default function Step_X_StudyUI() {
  const classes = useStyles();
  return <section className={classes.Step3StudyUI} >
    <h1>COMMING SOON</h1>
  </section>
}