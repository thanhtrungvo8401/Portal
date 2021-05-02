import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { theme } from "../../../components/theme";
import { getRandom } from "../../../utils/Helper";
import { jpSpeak, otherSpeack } from "../../../utils/textToSpeech";

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

export default function Step2StudyUI({ study, actionUpdate }) {
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
      <DisplayVocas vocas={listIntroduced} />
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => actionUpdate({ ...study, step: 1 })}
      >
        Reset
      </h2>
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
    zIndex: 1,
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
    "& .one-voca": {
      transition: `all ${duration}ms ease-in`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(1),
      "& :hover": {
        backgroundColor: theme.palette.info.light,
      },
    },
    "& .one-voca-enter": {
      opacity: 0,
      // transform: "translateY(-200%)",
    },
    "& .one-voca-enter-active": {
      opacity: 1,
      // transform: "translateY(0%)",
      transition: `all ${duration}ms ease-in`,
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
      <List
      //  style={{ backgroundColor: theme.palette.background.paper }}
      >
        <TransitionGroup className="vocas-group">
          {vocasRender.map((voca) => {
            return (
              <CSSTransition
                key={voca.id}
                classNames="one-voca"
                timeout={duration}
              >
                <ListItem className="one-voca">
                  <ListItemText
                    id={voca.id}
                    hidden={voca.isShow}
                    primary={voca.voca}
                  />
                  <ListItemText
                    id={voca.id}
                    hidden={!voca.isShow}
                    secondary={voca.meaning}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={!voca.isShow}
                      edge="end"
                      onChange={() => handleToggleShowMeaning(voca.id)}
                      inputProps={{ "aria-labelledby": voca.id }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </List>
    </Container>
  );
}
