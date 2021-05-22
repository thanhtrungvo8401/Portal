import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />
})


export default function TestVocaModal({ }) {
  const { isShowModal } = useSelector(state => state.testVoca);
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