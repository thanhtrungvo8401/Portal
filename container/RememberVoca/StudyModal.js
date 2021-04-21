import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { serviceGetVocasByCodes } from "../../service/vocaService";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function StudyModal({}) {
  const dispatch = useDispatch();
  const { IS_STUDY, rememberGroup } = useSelector(
    (state) => state.rememberGroups
  );
  useEffect(() => {
    if (IS_STUDY) {
      dispatch(serviceGetVocasByCodes(rememberGroup.vocaCodes));
    }
  }, [IS_STUDY]);   
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
