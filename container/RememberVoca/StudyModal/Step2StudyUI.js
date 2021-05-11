import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { theme } from "../../../components/theme";
import { getRandom, getWidth } from "../../../utils/Helper";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { animationDuration, styleStep_X_StudyUI } from "./StudyModal";
import IntroVoca from "./Step2StudyUI_Intro";
import DisplayVocas from "./Step2StudyUI_List";

// MAIN UI
const useStyles = makeStyles(() => ({
  Step2StudyUI: styleStep_X_StudyUI,
}));

export default function Step2StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
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
    <div className={classes.Step2StudyUI}>
      {isFinishIntro && (
        <Container style={{ paddingTop: theme.spacing(1) }}>
          <Typography color="primary">
            Cố gắng nhìn từ và đoán nghĩa của từ. Bạn có thế click (
            <VolumeUpRoundedIcon style={{ transform: `translateY(6px)` }} />) để
            nghe cách đọc và click vào từ để xem nghĩa của nó
          </Typography>
        </Container>
      )}
      <DisplayVocas vocas={listIntroduced} />
      {/* BG_DIV */}
      {isActiveIntroVoca && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.87)",
            opacity: 0.3,
            position: "absolute",
            width: "200vw",
            height: "100vh",
            left: 0,
            top: 0,
            transform:
              getWidth > 600
                ? "translateX(calc(200px - 50%))"
                : "translateX(0)",
            zIndex: 1,
          }}
        ></div>
      )}
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
          randVocas={study.randVocas}
        />
      </CSSTransition>

      {isFinishIntro && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            left: 0,
            bottom: theme.spacing(3),
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => actionUpdateBg({ step: 3 })}
            variant="contained"
            color="primary"
          >
            Qua bước tiếp theo
            <DoubleArrowIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
