import { Button, MobileStepper } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";


export default function MobileStepperCustom({
  totalStep, step, onClickNext, onClickBack, disabledNext, disabledBack
}) {
  return <MobileStepper
    variant="progress"
    position="static"
    steps={totalStep}
    activeStep={step - 1}
    style={{ width: "100%" }}
    nextButton={
      <Button
        color="primary" size="small"
        onClick={onClickNext} disabled={disabledNext}
      >
        <KeyboardArrowRight /> Next
      </Button>
    }
    backButton={
      <Button
        color="secondary" size="small"
        onClick={onClickBack} disabled={disabledBack}
      > Back <KeyboardArrowLeft />
      </Button>
    }
  />
}