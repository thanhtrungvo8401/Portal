import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetIsShowSetVocaModal,
  actionSet_SetVocaObject,
} from "../../redux/actions/setVocasActions";
import { actionResetError } from "../../redux/actions/errorActions";
import InputGroup, { validForm } from "../InputGroup";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const inputFields = ["setName"];
const inputTypes = {
  setName: "input",
};
const inputLabels = {
  setName: "Lesson XX: X X X X",
};
const inputRequired = ["setName"];
export default function SetVocaModal({ handleOnSubmit }) {
  const dispatch = useDispatch();

  const { isShowModal, setVoca } = useSelector((state) => state.setVocas);
  const ERROR = useSelector((state) => state.error);
  const isValidModal = validForm(setVoca, inputRequired, ERROR);

  const titleSetVocaModal = !Boolean(setVoca.id)
    ? "Create new vocabularies group"
    : "Update your vocabularies group";

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      actionSet_SetVocaObject({
        ...setVoca,
        [name]: value,
      })
    );
    dispatch(actionResetError());
  };
  useEffect(() => {
    if (!isShowModal) {
      dispatch(actionSet_SetVocaObject({}));
      dispatch(actionResetError());
    }
  }, [isShowModal]);
  return (
    <Dialog
      open={isShowModal}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      style={{ zIndex: 500 }}
    >
      <DialogTitle id="alert-dialog-slide-title">
        {titleSetVocaModal}
      </DialogTitle>
      <DialogContent>
        {/* FORM preventDefault */}
        {isShowModal && (
          <InputGroup
            object={setVoca}
            inputFields={inputFields}
            inputTypes={inputTypes}
            inputLabels={inputLabels}
            inputRequired={inputRequired}
            ERROR={ERROR}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            isUsedInModal={true}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          onClick={() => dispatch(actionSetIsShowSetVocaModal(false))}
        >
          Cancel
        </Button>
        <Button
          disabled={!isValidModal}
          onClick={handleOnSubmit}
          size="medium"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
