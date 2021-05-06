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

export default function Step3Study({ study, hidden, actionUpdateBg }) {
  const classes = useStyles();
  const [randVocas, setRandomVocas] = React.useState([]);
  React.useEffect(() => {
    const level = localStorageHelper.get(storageKey.MY_JP_LEVEL) || "N4";
    serviceFetVocaRandomByLevel(level).then((vocas) => setRandomVocas(vocas));
  }, []);
  return (
    <div hidden={hidden} className={classes.step3Study}>
      <Step3StudyUI
        randVocas={randVocas}
        study={study}
        actionUpdateBg={actionUpdateBg}
      />
    </div>
  );
}
