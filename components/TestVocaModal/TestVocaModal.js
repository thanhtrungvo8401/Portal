import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />
})

const isShowModal = true;

export default function TestVocaModal({ }) {
  return <Dialog
    open={isShowModal}
    TransitionComponent={Transition}
    keepMounted
    aria-labelledby="alert-dialog-slide-title"
    style={{ zIndex: 500 }}
  >
    <DialogTitle id="alert-dialog-slide-title">
      Hộp kí ức
    </DialogTitle>
    <DialogContent>
      <div>HELLO WORLD</div>
    </DialogContent>
  </Dialog>
}