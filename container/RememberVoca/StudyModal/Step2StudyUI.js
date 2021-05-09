import {
  Button,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { theme } from "../../../components/theme";
import { getRandom, getWidth } from "../../../utils/Helper";
import { jpSpeak } from "../../../utils/textToSpeech";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { animationDuration, styleStep_X_StudyUI } from "./StudyModal";
import IntroVoca from "./Step2StudyUI_Intro";

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
  const introAnimationIn = () => {
    setIsActiveIntroVoca(true);
  };
  const handleAfterEnter = () => {
    const random = getRandom(0, list.length - 1);
    setVoca(list[random]);
    setList(list.filter((el, index) => index !== random));
  };
  const introAnimationOut = () => {
    setIsActiveIntroVoca(false);
  };
  const handleAfterExit = () => {
    setListIntroduced([...listIntroduced, voca]);
    setVoca({});
    if (list.length) {
      introAnimationIn();
    }
    // in again
  };
  React.useEffect(() => {
    setTimeout(() => {
      introAnimationIn();
    }, animationDuration);
  }, []);

  return (
    <div className={classes.Step2StudyUI}>
      <Container style={{ paddingTop: theme.spacing(1) }}>
        <Typography color="primary">
          Cố gắng nhìn từ và đoán nghĩa của từ. Bạn có thế click (
          <VolumeUpRoundedIcon style={{ transform: `translateY(6px)` }} />) để
          nghe cách đọc và click vào từ để xem nghĩa của nó
        </Typography>
      </Container>
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
        />
      </CSSTransition>

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
    </div>
  );
}



// LIST COMPONENT
const useStyles2 = makeStyles((theme) => ({
  DisplayVocas: {
    position: "absolute",
    zIndex: 0,
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    width: "100%",
    textAlign: "center",
    "& .one-voca": {
      transition: `all ${animationDuration}ms ease-in`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(1),
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        boxShadow:
          "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
      },
    },
    "& .one-voca-enter": {
      opacity: 0,
    },
    "& .one-voca-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .one-voca-exit": {
      opacity: 1,
    },
    "& .one-voca-exit-active": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    // Voca Meaning
    "& .voca-meaning": {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 1,
      padding: "8px 48px 8px 16px",
      boxSizing: "border-box",
      backgroundColor: theme.palette.background.paper,
      transform: "translateX(-100%)",
      opacity: 0,
    },
    "& .voca-meaning-enter": {
      transform: "translateX(100%)",
      opacity: 0,
    },
    "& .voca-meaning-enter-active": {
      transform: "translateX(0%)",
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .voca-meaning-enter-done": {
      transform: "translateX(0%)",
      opacity: 1,
    },
    "& .voca-meaning-exit": {
      transform: "translateX(0%)",
      opacity: 1,
    },
    "& .voca-meaning-exit-active": {
      transform: "translateX(-100%)",
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .voca-meaning-exit-done": {
      transform: "translateX(-100%)",
      opacity: 0,
    },
  },
}));
function DisplayVocas({ vocas = [] }) {
  const classes = useStyles2();
  const [vocasRender, setVocasRender] = React.useState([]);
  const handleToggleShowMeaning = (id) => {
    const newVocaRender = vocasRender.map((el) =>
      el.id === id ? { ...el, isShow: !el.isShow } : el
    );
    setVocasRender(newVocaRender);
  };
  const handleRandomVoca = () => {
    const oldList = [...vocasRender];
    const newList = [];
    setVocasRender([]);
    setTimeout(() => {
      while (oldList.length > 0) {
        const rand = getRandom(0, oldList.length - 1);
        newList.push(oldList[rand]);
        oldList.splice(rand, 1);
      }
      setVocasRender(newList);
    }, animationDuration);
  };
  React.useEffect(() => {
    if (vocas.length) {
      setVocasRender([
        { ...vocas[vocas.length - 1], isShow: false },
        ...vocasRender,
      ]);
    }
  }, [vocas]);
  if (!vocas.length) return null;
  return (
    <Container className={classes.DisplayVocas}>
      <List>
        <TransitionGroup className="vocas-group">
          {vocasRender.map((voca) => {
            return (
              <CSSTransition
                key={voca.id}
                classNames="one-voca"
                timeout={animationDuration}
              >
                <ListItem
                  className="one-voca"
                  onClick={() => handleToggleShowMeaning(voca.id)}
                >
                  {/* JP */}
                  <Typography color="primary" variant="h6">
                    {voca.voca}
                  </Typography>
                  {/* VN */}
                  <CSSTransition
                    classNames="voca-meaning"
                    timeout={animationDuration}
                    in={voca.isShow}
                  >
                    <Typography
                      className="voca-meaning"
                      color="textSecondary"
                      style={{ fontWeight: "lighter" }}
                      variant="h6"
                    >
                      {voca.meaning}
                    </Typography>
                  </CSSTransition>
                  <ListItemSecondaryAction
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <VolumeUpRoundedIcon
                      onClick={() => jpSpeak({ content: voca.voca })}
                      style={{ cursor: "pointer" }}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </List>

      <Button
        onClick={() => handleRandomVoca()}
        variant="outlined"
        color="primary"
      >
        <SyncRoundedIcon />
        Trộn từ
      </Button>
    </Container>
  );
}
