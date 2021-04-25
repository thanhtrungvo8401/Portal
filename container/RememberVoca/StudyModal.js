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
import { serviceGetVocasByCodes } from "../../service/vocaService";
import { actionSetIsStudy } from "../../redux/actions/rememberGroupAction";
import Step1Study from "./Step1Study";
import Step2Study from "./Step2Study";
import StudyBg from "./StudyBg";

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
        <Step1Study
          hidden={study.step !== 1}
          study={study}
          actionUpdate={setStudy}
          actionUpdateBg={setBgAni}
        />
        <Step2Study
          hidden={study.step !== 2}
          study={study}
        />

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
