import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { actionCloseToast, actionOpenToast } from "redux/actions/toastActions";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { storeClient } from "redux/store";

export default function ToastComponent(props) {
  const toastOb = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnClose = () => {
    dispatch(actionCloseToast());
  };
  return (
    <Snackbar
      open={toastOb.open}
      autoHideDuration={5000}
      onClose={handleOnClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={toastOb.type} onClose={handleOnClose}>
        {toastOb.content}
      </Alert>
    </Snackbar>
  );
}

ToastComponent.proptypes = {
  type: Proptypes.string.isRequired,
  content: Proptypes.string.isRequired,
};

export const toast = {
  success: (content) => {
    storeClient.dispatch(
      actionOpenToast({ content: content, type: "success" })
    );
  },
  error: (content) => {
    storeClient.dispatch(actionOpenToast({ content: content, type: "error" }));
  },
  warning: (content) => {
    storeClient.dispatch(
      actionOpenToast({ content: content, type: "warning" })
    );
  },
  info: (content) => {
    storeClient.dispatch(actionOpenToast({ content: content, type: "info" }));
  },
};
