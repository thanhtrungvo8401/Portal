import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import Step1Study from "./Step1Study";
import Step2Study from "./Step2Study";
import StudyBg from "./StudyBg";
import Step3Study from "./Step3Study";
import BreadcrumbsCustom from "../../../components/Breadcrumbs/Breadcrumbs";
import PageTitle from "../../../components/PageComponent/PageTitle";

import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { appUrl } from "../../../utils/APP_URL";

const useStyles = makeStyles((theme) => ({}));
const initState = {
  vocas: [],
  inActiveVocas: [],
  step: 1,
};
const initBg = { step: 0 };
export default function StudyModal({}) {
  const classes = useStyles();
  const { list } = useSelector((state) => state.vocas);

  const [study, setStudy] = React.useState({ ...initState });
  const [bgAni, setBgAni] = React.useState({ ...initBg });

  // update data after fetch vocas:
  useEffect(() => {
    setStudy({ ...study, vocas: list, inActiveVocas: [] });
  }, [list]);
  return (
    <React.Fragment>
      <BreadcrumbsCustom
        parents={[
          {
            Icon: HomeIcon,
            label: "Study room",
            url: appUrl.studyRoom(),
          },
          {
            Icon: MenuBookIcon,
            label: "Remember group",
            url: appUrl.rememberVoca(),
          },
        ]}
        label="Danh sach tu vung"
      />
      <PageTitle>Try to remember all the words</PageTitle>
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
      {study.step === 3 && <Step3Study study={study} />}

      <StudyBg
        bgAni={bgAni}
        actionUpdateBg={setBgAni}
        study={study}
        actionUpdate={setStudy}
      />
    </React.Fragment>
  );
}

export const bgStep_X_Study = {
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: "0 auto",
  zIndex: 500,
  position: "fixed",
  backgroundImage:
    "linear-gradient(to left top, #ecabf9, #ebbdfe, #ebcdff, #eeddff, #f3ecff, #f3ecff, #f3ecff, #f3ecff, #eeddff, #ebcdff, #ebbdfe, #ecabf9)",
};

export const styleStep_X_StudyUI = {
  width: "100%",
  maxWidth: 600,
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  height: "100%",
};

export const animationDuration = 500;
