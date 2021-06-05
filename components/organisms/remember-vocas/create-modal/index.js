import React from "react";
import MobileStepperCustom from "components/molecules/mobile-stepper-custom";
import { actionSetIshowCreateModal } from "redux/actions/rememberGroupAction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import { CREATE_REMEMBER_TYPE, LEVEL } from "utils/Constant";
import Step1 from "components/organisms/remember-vocas/create-modal/step1";
import Step2 from "components/organisms/remember-vocas/create-modal/step2";
import Step3 from "components/organisms/remember-vocas/create-modal/step3";
import Step4 from "components/organisms/remember-vocas/create-modal/step4";
import { useDispatch, useSelector } from "react-redux";

const initCreateObject = {
  name: "",
  type: CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET,
  level: LEVEL.N5,
  setVoca: {},
  vocas: [],
  multiRemember: {}, // Create more than one vocas-remember
  step: 1,
  totalStep: 4,
  isValidStep: false,
};

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getComponentByStep = (createObject, actionUpdate) => {
  switch (createObject.step) {
    case 1:
      return <Step1 object={createObject} actionUpdate={actionUpdate} />;
    case 2:
      return <Step2 object={createObject} actionUpdate={actionUpdate} />;
    case 3:
      return <Step3 object={createObject} actionUpdate={actionUpdate} />;
    case 4:
      return <Step4 object={createObject} actionUpdate={actionUpdate} />;
    default:
      return;
  }
}

export default function CreateRememberGroupModal({ onSubmit }) {
  const dispatch = useDispatch();
  const { isShowCreateModal } = useSelector((state) => state.rememberGroups);
  const [createObject, setCreateObject] = React.useState({ ...initCreateObject });
  const { totalStep, step, isValidStep } = createObject;
  const hideSubmitBtn = step !== totalStep || !isValidStep;

  React.useEffect(() => {
    if (!isShowCreateModal) {
      setCreateObject({ ...initCreateObject });
    }
  }, [isShowCreateModal]);

  return <Dialog
    open={isShowCreateModal}
    TransitionComponent={Transition}
    aria-labelledby="alert-dialog-slide-title"
    style={{ zIndex: 500 }}
    keepMounted
  >
    <DialogTitle color="primary">Create your remember-group</DialogTitle>
    <DialogContent>
      <MobileStepperCustom
        totalStep={totalStep}
        step={step}
        onClickNext={() => setCreateObject({ ...createObject, step: step + 1 })}
        disabledNext={step === totalStep || !isValidStep}
        onClickBack={() => setCreateObject({ ...createObject, step: step - 1 })}
        disabledBack={step === 1}
      />
      {getComponentByStep(createObject, setCreateObject)}
    </DialogContent>
    <DialogActions>
      <Button
        size="medium" color="secondary"
        onClick={() => dispatch(actionSetIshowCreateModal(false))}
      >Hủy bỏ</Button>

      <Button
        size="medium" color="primary"
        className={hideSubmitBtn ? 'hide' : ''}
        onClick={() => onSubmit(createObject)}
      >Tạo mới</Button>
    </DialogActions>
  </Dialog>
}