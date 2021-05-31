import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { theme } from "components/theme";
import { getRandom } from "utils/Helper";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { constantApp } from "utils/Constant";
import IntroVoca from "components/organisms/remember-vocas-[id]/step-2/IntroUi";
import DisplayVocas from "components/organisms/remember-vocas-[id]/step-2/ListUi";

// MAIN UI
const useStyles = makeStyles(() => ({
  Step2StudyUI: {},
}));

const animationDuration = constantApp.animationDuration;

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
      <Container style={{ paddingTop: theme.spacing(1), opacity: isFinishIntro ? 1 : 0 }}>
        <Button color="default" >
          <HelpOutlineIcon style={{ fontSize: "2.5rem", marginRight: theme.spacing(1) }} />
          <Typography
            color="textSecondary"
          >
            Click để nghe hướng dẫn
            </Typography>
        </Button>
      </Container>
      <DisplayVocas vocas={listIntroduced} isFinishIntro={isFinishIntro} />
      {/* BG_DIV */}
      {isActiveIntroVoca && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.87)",
            opacity: 0.3,
            position: "fixed",
            width: "100vw",
            height: "100vh",
            left: 0,
            top: 0,
            zIndex: 0,
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
        />
      </CSSTransition>

      {isFinishIntro && (
        <Box
          style={{
            marginTop: theme.spacing(5),
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
        </Box>
      )}
    </div>
  );
}
