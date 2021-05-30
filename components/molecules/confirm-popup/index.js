import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import theme from "components/theme";

export default function ConfirmPopup({
  isOpen, title, description, cancleAction, confirmAction, closeAction
}) {
  return <Dialog
    open={isOpen}
    aria-labelledby="form-dialog-title"
    onClose={closeAction}
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