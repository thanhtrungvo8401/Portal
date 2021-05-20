import React from "react";
import { useSelector } from "react-redux";
import Step1Study from "./Step1Study";
import Step2Study from "./Step2Study";
import StudyBg from "./StudyBg";
import Step4Study from "./Step4Study";
import Step5Study from "./Step5Study";
import Step6Study from "./Step6Study";
import { localStorageHelper } from "../../../utils/storageHelper";
import { storageKey } from "../../../utils/Constant";
import { serviceFetVocaRandomByLevel } from "../../../service/vocaService";
import { handleErrorAPI } from "../../../utils/Helper";
import Step_X_Study from "./Step_X_Study";

const initState = {
  vocas: [],
  randVocas: [],
  inActiveVocas: [],
  step: 1,
};
const initBg = { step: 0 };
export default function StudyModal({ }) {
  const { list } = useSelector((state) => state.vocas);

  const [study, setStudy] = React.useState({ ...initState });
  const [bgAni, setBgAni] = React.useState({ ...initBg });

  // update data after fetch vocas:
  React.useEffect(() => {
    setStudy({ ...study, vocas: list, inActiveVocas: [] });
  }, [list]);
  React.useEffect(() => {
    const level = localStorageHelper.get(storageKey.MY_JP_LEVEL) || "N4";
    serviceFetVocaRandomByLevel(level)
      .then((randVocas) =>
        setStudy({
          ...study,
          randVocas,
        })
      )
      .catch((err) => {
        handleErrorAPI(err, "toast");
      });
  }, []);
  return (
    <React.Fragment>
      {study.step === 1 && (
        <Step1Study
          study={study}
          actionUpdate={setStudy}
          actionUpdateBg={setBgAni}
        />
      )}
      {study.step === 2 && (
        <Step2Study study={study} actionUpdateBg={setBgAni} />
      )}
      {study.step === 4 && (
        <Step4Study study={study} actionUpdateBg={setBgAni} />
      )}

      {study.step === 5 && (
        <Step5Study study={study} actionUpdateBg={setBgAni} />
      )}

      {study.step === 6 && <Step6Study study={study} />}

      {/* {study.step === 6 && <Step_X_Study study={study} actionUpdateBg={setBgAni} />} */}

      <StudyBg
        bgAni={bgAni}
        actionUpdateBg={setBgAni}
        study={study}
        actionUpdate={setStudy}
      />
    </React.Fragment>
  );
}

export const bgStep_X_Study = {};

export const styleStep_X_StudyUI = {
  width: "100%",
  maxWidth: 600,
  margin: "0 auto"
};

export const animationDuration = 500;
