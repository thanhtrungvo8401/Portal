import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetCreateRememberGroup,
  actionSetIsCreating,
} from "../../redux/actions/rememberGroupAction";
import { constantApp } from "../../utils/Constant";
import { Button, Card, CardContent, MobileStepper } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

export default function CreateRememberGroup() {
  const { isCreating, createObject } = useSelector(
    (state) => state.rememberGroup
  );
  const { type, level, setVoca, vocas, step, totalStep } = createObject;
  const [isRender, setIsRender] = useState(isCreating);
  const dispatch = useDispatch();

  // UI INTERACT:
  const handleNext = () => {
    if (step < totalStep) {
      dispatch(
        actionSetCreateRememberGroup({
          ...createObject,
          step: step + 1,
        })
      );
    }
  };
  const handleBack = () => {
    if (step > 1) {
      dispatch(
        actionSetCreateRememberGroup({
          ...createObject,
          step: step - 1,
        })
      );
    }
  };

  // Animation useEffect:
  useEffect(() => {
    if (isCreating) setIsRender(true);
    else {
      setTimeout(() => setIsRender(false), constantApp.timeOutUseEffect);
    }
  }, [isCreating]);

  return (
    isRender && (
      <Grow
        in={isCreating}
        style={{ transformOrigin: "0 0 0" }}
        {...(isCreating ? { timeout: constantApp.timeout } : {})}
      >
        <Card>
          <CardContent>
            <MobileStepper
              variant="progress"
              color=""
              steps={totalStep}
              position="static"
              activeStep={step - 1}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={step === totalStep}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={step === 1}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
            <button
              onClick={() => {
                dispatch(actionSetIsCreating(false));
              }}
            >
              Cancle
            </button>
          </CardContent>
        </Card>
      </Grow>
    )
  );
}
