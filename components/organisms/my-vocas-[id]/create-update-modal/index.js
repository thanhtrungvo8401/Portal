import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSetVocabularyObject } from "redux/actions/vocaActions";
import { actionResetError } from "redux/actions/errorActions";
import { actionSetIsShowVocaModal } from "redux/actions/vocaActions";
import InputGroup, { validForm } from "components/InputGroup";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const inputRequired = ["voca", "meaning"];
export default function CreateUpdateVocaModal({ onSubmit }) {
  const dispatch = useDispatch();
  const { isShowVocaModal, voca } = useSelector(state => state.vocas);
  const ERROR = useSelector(state => state.error);
  const isValidModal = validForm(voca, inputRequired, ERROR);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(actionSetVocabularyObject({ ...voca, [name]: value }));
    dispatch(actionResetError());
  }

  React.useEffect(() => {
    if (isShowVocaModal) {
      dispatch(actionSetVocabularyObject({}));
      dispatch(actionResetError());
    }
  }, [isShowVocaModal]);

  return <Dialog
    open={isShowVocaModal}
    TransitionComponent={Transition}
    keepMounted
    aria-labelledby="alert-dialog-slide-title"
    style={{ zIndex: 500 }}
  >
    <DialogTitle id="alert-dialog-slide-title">
      {!Boolean(voca.id)
        ? "Thêm từ vựng vào danh sách!"
        : "Chỉnh sửa lại từ vựng!"}
    </DialogTitle>
    <DialogContent style={{ overflow: 'hidden' }} >
      {isShowVocaModal && (
        <InputGroup
          object={voca}
          inputFields={["voca", "meaning"]}
          inputTypes={{ voca: "input", meaning: "input" }}
          inputLabels={{ voca: "Từ vựng", meaning: "Nghĩa" }}
          inputRequired={inputRequired}
          ERROR={ERROR}
          handleOnChange={handleOnChange}
          handleOnSubmit={onSubmit}
          isUsedInModal={true}
        />
      )}
    </DialogContent>
    <DialogActions>
      <Button size="medium" onClick={() => dispatch(actionSetIsShowVocaModal(false))} >
        Hủy
      </Button>
      <Button disabled={!isValidModal} onClick={onSubmit} size="medium" color="primary" >
        Lưu
      </Button>
    </DialogActions>
  </Dialog>
}