import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import { actionSetIsShowSetVocaModal, actionSet_SetVocaObject } from "redux/actions/setVocasActions";
import { actionResetError } from "redux/actions/errorActions";
import InputsGroup, { validForm } from "components/molecules/inputs-group";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const inputRequired = ["setName"];
export default function SetVocaModal({ onSubmit }) {
  const dispatch = useDispatch();
  const { isShowModal, setVoca } = useSelector((state) => state.setVocas);
  const ERROR = useSelector((state) => state.error);
  const isValidModal = validForm(setVoca, inputRequired, ERROR);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(actionSet_SetVocaObject({ ...setVoca, [name]: value }));
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
        {!Boolean(setVoca.id)
          ? "Đặt tên cho bài học bạn muốn tạo!"
          : "Chỉnh sửa lại tên bài học của bạn!"}
      </DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }} >
        {isShowModal && (
          <InputsGroup
            object={setVoca}
            inputFields={["setName"]}
            inputTypes={{ setName: "input" }}
            inputLabels={{ setName: "Bài học XX: X X X X" }}
            inputRequired={inputRequired}
            ERROR={ERROR}
            handleOnChange={handleOnChange}
            handleOnSubmit={onSubmit}
            isUsedInModal={true}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          onClick={() => dispatch(actionSetIsShowSetVocaModal(false))}
        >
          Hủy
        </Button>
        <Button
          disabled={!isValidModal}
          onClick={onSubmit}
          size="medium"
          color="primary"
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
