import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { getRandom } from "utils/Helper";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { constantApp } from "utils/Constant";
import IntroVoca from "components/organisms/remember-vocas-[id]/step-2/IntroUi";
import DisplayVocas from "components/organisms/remember-vocas-[id]/step-2/ListUi";
import BgBlackOpacity from "components/atoms/bg-black-opacity";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import { BodyMaxWidth } from "components/atoms/body-wrapper";

const animationDuration = constantApp.animationDuration;

export default function Step2StudyUI({ study, actionChangeStep }) {
  const [list, setList] = React.useState([...study.vocas]);
  const [listIntroduced, setListIntroduced] = React.useState([]);
  // Animation for Intro Voca:listIntroduced
  const [voca, setVoca] = React.useState({});
  const [isActiveIntroVoca, setIsActiveIntroVoca] = React.useState(false);
  const [isFinishIntro, setIsFinishIntro] = React.useState(false);
  // 01: Animation for in
  const introAnimationIn = () => setIsActiveIntroVoca(true);
  // 02: After animation-in is complete => start to read voca:
  const handleAfterEnter = () => {
    const random = getRandom(0, list.length - 1);
    setVoca(list[random]);
    setList(list.filter((el, index) => index !== random));
  };
  // 03: Animation for out:
  const introAnimationOut = () => setIsActiveIntroVoca(false);
  // 04: IF (list > 0) => 01: Animation in
  // 04: ELSE finish intro
  const handleAfterExit = () => {
    setListIntroduced([...listIntroduced, voca]);
    setVoca({});
    if (list.length > 0) introAnimationIn();
    else setIsFinishIntro(true);
  };
  React.useEffect(() => {
    setTimeout(() => {
      introAnimationIn();
    }, animationDuration);
  }, []);
  return (
    <BodyMaxWidth>
      <DisplayVocas vocas={listIntroduced} isFinishIntro={isFinishIntro} />
      <BgBlackOpacity isActive={isActiveIntroVoca} />
      <CSSTransition
        in={Boolean(isActiveIntroVoca)}
        timeout={animationDuration}
        classNames="voca-intro"
        onEntered={handleAfterEnter}
        onExited={handleAfterExit}
      >
        <IntroVoca
          callback={introAnimationOut}
          isActive={isActiveIntroVoca}
          voca={voca}
        />
      </CSSTransition>

      <ActionsBtnGroup center={true} hidden={!isFinishIntro} >
        <Button onClick={() => actionChangeStep(3)} variant="contained" color="primary">
          Qua bước tiếp theo <DoubleArrowIcon />
        </Button>
      </ActionsBtnGroup>
    </BodyMaxWidth>
  );
}
