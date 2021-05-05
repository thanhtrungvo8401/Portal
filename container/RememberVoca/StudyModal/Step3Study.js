import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { serviceFetVocaRandomByLevel } from "../../../service/vocaService";
import { storageKey } from "../../../utils/Constant";
import { localStorageHelper } from "../../../utils/storageHelper";
import Step3StudyUI from "./Step3StudyUI";
import { bgStep_X_Study } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  step3Study: bgStep_X_Study,
}));

export default function Step3Study({ study, hidden }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const level = localStorageHelper.get(storageKey.MY_JP_LEVEL) || 'N4';
    dispatch(serviceFetVocaRandomByLevel(level));
  }, []);
  return (
    <div hidden={hidden} className={classes.step3Study}>
      <Step3StudyUI study={study} />
    </div>
  );
}
