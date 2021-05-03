import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Slide,
  Typography,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { serviceGetVocasByCodes } from "../../../service/vocaService";
import { actionSetIsStudy } from "../../../redux/actions/rememberGroupAction";
import Step1Study from "./Step1Study";
import Step2Study from "./Step2Study";
import StudyBg from "./StudyBg";
import Step3Study from "./Step3Study";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  studyModal: {
    "& .MuiPaper-root.MuiDialog-paper": {
      margin: 0,
      width: "100%",
      height: "100%",
      maxWidth: "100%!important",
      maxHeight: "100%!important",
      borderRadius: 0,
      overflow: "hidden",
      position: "relative",
    },
  },
  studyModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    maxWidth: 600,
    width: "100%",
    margin: "0 auto",
  },
}));
const initState = {
  vocas: [],
  inActiveVocas: [],
  step: 1,
};
const initBg = { step: 0 };
export default function StudyModal({}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { IS_STUDY, rememberGroup } = useSelector(
    (state) => state.rememberGroups
  );
  const { list } = useSelector((state) => state.vocas);

  const [study, setStudy] = React.useState({ ...initState });
  const [bgAni, setBgAni] = React.useState({ ...initBg });

  useEffect(() => {
    if (IS_STUDY) {
      dispatch(serviceGetVocasByCodes(rememberGroup.vocaCodes));
    } else {
      setStudy({ ...initState });
      setBgAni({ ...initBg });
    }
  }, [IS_STUDY]);
  // update data after fetch vocas:
  useEffect(() => {
    setStudy({ ...study, vocas: list, inActiveVocas: [] });
  }, [list]);
  return (
    <Dialog
      open={IS_STUDY}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      keepMounted
      className={classes.studyModal}
      style={{ zIndex: 500 }}
    >
      {/* TITLE */}
      <div className={classes.studyModalHeader}>
        <Typography color="primary">MEOMEO-kun.com</Typography>
        <IconButton
          onClick={() => {
            dispatch(actionSetIsStudy(false));
          }}
          style={{ marginRight: "-12px" }}
        >
          <HighlightOffIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
      <DialogContent>
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
        {study.step === 3 && <Step3Study />}

        <StudyBg
          bgAni={bgAni}
          actionUpdateBg={setBgAni}
          study={study}
          actionUpdate={setStudy}
        />
      </DialogContent>
    </Dialog>
  );
}

export const bgStepXStudy = {
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: "0 auto",
  zIndex: 0,
  position: "absolute",
  backgroundImage:
    "linear-gradient(to left top, #ffffff, #e9e4fb, #d4caf7, #c1aff1, #ae94ea, #ae94ea, #ae94ea, #ae94ea, #c1aff1, #d4caf7, #e9e4fb, #ffffff)",
};
