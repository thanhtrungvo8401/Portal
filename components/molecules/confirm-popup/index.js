import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import theme from "components/theme";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConfirmPopup({
  isOpen, title, description, cancleAction, confirmAction, closeAction
}) {
  return <Dialog
    open={isOpen}
    aria-labelledby="form-dialog-title"
    onClose={closeAction}
    TransitionComponent={Transition}
  >
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent style={{ color: theme.palette.error.main }}>{description}</DialogContent>
    <DialogActions>
      <Button size="small" onClick={cancleAction}>
        Hủy bỏ
      </Button>
      <Button
        size="small"
        onClick={confirmAction}
      >
        Xác nhận
      </Button>
    </DialogActions>
  </Dialog>
}