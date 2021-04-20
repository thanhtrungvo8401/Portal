import React from "react";
import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import { useSelector } from "react-redux";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function StudyModal({}) {
  const { IS_STUDY } = useSelector((state) => state.rememberGroups);
  return (
    <Dialog
      open={IS_STUDY}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      style={{ zIndex: 500 }}
      keepMounted
    >
      <DialogTitle id="alert-dialog-slide-title">
        Edit your remember-group
      </DialogTitle>
      <DialogContent>Programing .....</DialogContent>
    </Dialog>
  );
}
