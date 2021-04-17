import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MobileStepper,
  Slide,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSetIshowCreateModal } from "../../redux/actions/rememberGroupAction";
import { CREATE_REMEMBER_TYPE, LEVEL } from "../../utils/Constant";
import Step1 from "./Step1";
import Step2 from "./Step2";

const initCreateObject = {
  type: CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET,
  level: LEVEL.N5,
  setVoca: {},
  vocas: [],
  step: 1,
  totalStep: 5,
};

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getComponentByStep = (createObject, actionUpdate) => {
  switch (createObject.step) {
    case 1:
      return <Step1 object={createObject} actionUpdate={actionUpdate} />;
    case 2:
      return <Step2 object={createObject} actionUpdate={actionUpdate}></Step2>;
    default:
      return <></>;
  }
};

export default function CreateRememberGroupModal({}) {
  const dispatch = useDispatch();
  const { isShowCreateModal } = useSelector((state) => state.rememberGroup);
  const [createObject, setCreateObject] = useState({ ...initCreateObject });
  useEffect(() => {
    if (!isShowCreateModal) {
      setCreateObject({ ...initCreateObject });
    }
  }, [isShowCreateModal]);
  return (
    <Dialog
      open={isShowCreateModal}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      style={{ zIndex: 500 }}
      keepMounted
    >
      <DialogTitle>Create your remember-group</DialogTitle>
      <DialogContent>
        <MobileStepper
          variant="progress"
          steps={createObject.totalStep}
          position="static"
          activeStep={createObject.step - 1}
          style={{
            maxWidth: 400,
            flexGrow: 1,
          }}
          nextButton={
            <Button
              onClick={() =>
                setCreateObject({
                  ...createObject,
                  step: createObject.step + 1,
                })
              }
              size="small"
              disabled={createObject.step === createObject.totalStep}
            >
              <KeyboardArrowRight /> Next
            </Button>
          }
          backButton={
            <Button
              onClick={() =>
                setCreateObject({
                  ...createObject,
                  step: createObject.step - 1,
                })
              }
              size="small"
              disabled={createObject.step === 1}
            >
              Back <KeyboardArrowLeft />
            </Button>
          }
        ></MobileStepper>
        {getComponentByStep(createObject, setCreateObject)}
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          onClick={() => dispatch(actionSetIshowCreateModal(false))}
        >
          Cancel
        </Button>
        <Button
          className={`${
            createObject.step !== createObject.totalStep ? "hide" : ""
          }`}
          size="medium"
          color="primary"
        >
          Create Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}
