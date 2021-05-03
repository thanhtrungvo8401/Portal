import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { theme } from "../../../components/theme";
import { getRandom, getWidth } from "../../../utils/Helper";
import { jpSpeak, otherSpeack } from "../../../utils/textToSpeech";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

// MAIN UI
const useStyles = makeStyles(() => ({
  Step2StudyUI: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    height: "100%",
  },
}));
const duration = 500;

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
    }, duration);
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
        timeout={duration}
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

// INTRO VOCA COMPONENT
const useStyles1 = makeStyles((theme) => ({
  VocaIntro: {
    display: "inline-block",
    minWidth: "300px",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    position: "absolute",
    zIndex: 2,
    textAlign: "Center",
    top: "50%",
    left: "50%",
    transform: "translateY(-100%) translateX(-50%)",
    top: 0,
    opacity: 0,
    // intro-voca-animation
    "&.voca-intro-enter": {
      opacity: 0,
      top: 0,
      transform: "translateY(-100%) translateX(-50%)",
    },
    "&.voca-intro-enter-active": {
      opacity: 1,
      top: "50%",
      transform: "translateY(-50%) translateX(-50%)",
      transition: `all ${duration}ms ease-in`,
    },
    "&.voca-intro-enter-done": {
      opacity: 1,
      top: "50%",
      transform: "translateY(-50%) translateX(-50%)",
      transition: `all ${duration}ms ease-in`,
    },
    "&.voca-intro-exit": {
      opacity: 1,
      top: "50%",
      transform: "translateY(-50%) translateX(-50%)",
    },
    "&.voca-intro-exit-active": {
      opacity: 0,
      top: 0,
      transform: "translateY(-100%) translateX(-50%)",
      transition: `all ${duration}ms ease-in`,
    },
    // voca in intro-voca:
    "& .jp-enter": {
      opacity: 0,
    },
    "& .jp-enter-active": {
      opacity: 1,
      transition: `opacity ${duration}ms ease-in`,
    },
    "& .jp-exit": {
      opacity: 1,
    },
    "& .jp-exit-active": {
      opacity: 0,
      transition: `opacity ${duration}ms ease-in`,
    },
  },
}));

// const fields = ["voca", "meaning", "sentence"];
function IntroVoca({ voca = {}, isActive, callback }) {
  const classes = useStyles1();
  const [run1, setRun1] = React.useState(0);
  const nextRun1 = () => {
    if (run1 < 2) {
      setRun1(run1 + 1);
    } else if (run1 == 2 && voca.sentence) {
      setRun1(run1 + 1);
    } else {
      runStep2();
    }
  };
  const runStep2 = () => {
    jpSpeak({ content: voca["voca"] })
      .then(() => {
        return otherSpeack({ content: voca["meaning"] });
      })
      .then(() => {
        if (voca["sentence"]) {
          jpSpeak({ content: voca["sentence"] }).then(() => callback());
        } else {
          callback();
        }
      });
  };
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        nextRun1();
      }, duration);
    } else {
      setRun1(0);
    }
  }, [isActive]);
  return (
    <Paper elevation={3} className={classes.VocaIntro}>
      <TransitionGroup className="group">
        {run1 >= 1 && (
          <CSSTransition
            classNames="jp"
            key={1}
            timeout={duration}
            onEntered={() => {
              jpSpeak({ content: voca["voca"] })
                .then(() => {
                  nextRun1();
                })
                .catch((err) => console.log(err));
            }}
          >
            <div>
              <Typography variant="h5">{voca.voca}</Typography>
              <Typography variant="caption" style={{ display: "block" }}>
                {voca.note}
              </Typography>
            </div>
          </CSSTransition>
        )}
        {run1 >= 2 && (
          <CSSTransition
            classNames="jp"
            key={2}
            timeout={duration}
            onEntered={() => {
              otherSpeack({ content: voca["meaning"] })
                .then(() => {
                  nextRun1();
                })
                .catch((err) => console.log(err));
            }}
          >
            <div>
              <Divider
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
              />
              <Typography variant="body2">{voca.meaning}</Typography>
            </div>
          </CSSTransition>
        )}
        {run1 >= 3 && (
          <CSSTransition
            classNames="jp"
            key={3}
            timeout={duration}
            onEntered={() => {
              jpSpeak({ content: voca["sentence"] })
                .then(() => {
                  nextRun1();
                })
                .catch((err) => console.log(err));
            }}
          >
            <div>
              <Divider
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
              />
              <Typography variant="body2">{voca.sentence}</Typography>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Paper>
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
      transition: `all ${duration}ms ease-in`,
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
      transition: `all ${duration}ms ease-in`,
    },
    "& .one-voca-exit": {
      opacity: 1,
    },
    "& .one-voca-exit-active": {
      opacity: 0,
      transition: `all ${duration}ms ease-in`,
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
      transition: `all ${duration}ms ease-in`,
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
      transition: `all ${duration}ms ease-in`,
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
    }, duration);
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
                timeout={duration}
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
                    timeout={duration}
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
