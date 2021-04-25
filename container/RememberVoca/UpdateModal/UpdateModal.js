import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputGroup, { validForm } from "../../../components/InputGroup";
import {
  actionSetIshowUpdateModal,
  actionSetRememberGroup,
} from "../../../redux/actions/rememberGroupAction";
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UpdateRememberGroupModal({ onSubmit }) {
  const { isShowUpdateModal, rememberGroup } = useSelector(
    (state) => state.rememberGroups
  );
  const dispatch = useDispatch();
  const ERROR = useSelector((state) => state.error);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(actionSetRememberGroup({ ...rememberGroup, [name]: value }));
  };
  const isValidModal = validForm(rememberGroup, ["name"], ERROR);
  return (
    <Dialog
      open={isShowUpdateModal}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      style={{ zIndex: 500 }}
      keepMounted
    >
      <DialogTitle id="alert-dialog-slide-title">
        Edit your remember-group
      </DialogTitle>
      <DialogContent>
        {isShowUpdateModal && (
          <InputGroup
            object={rememberGroup}
            inputFields={["name"]}
            inputTypes={{ name: "input" }}
            inputLabels={{ name: "Name" }}
            inputRequired={["name"]}
            ERROR={ERROR}
            isUsedInModal={true}
            handleOnChange={handleOnChange}
            handleOnSubmit={onSubmit}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          onClick={() => dispatch(actionSetIshowUpdateModal(false))}
        >
          Cancel
        </Button>
        <Button
          disabled={!isValidModal}
          onClick={onSubmit}
          size="medium"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
