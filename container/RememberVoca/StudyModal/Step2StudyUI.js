import {
  Container,
  Divider,
  makeStyles,
  Paper,
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
  },
}));
const duration = 500;

export default function Step2StudyUI({ study, actionUpdate }) {
  const classes = useStyles();
  const [list, setList] = React.useState([...study.vocas]);
  const [listShowed, setListShowed] = React.useState([]);
  // Animation for Intro Voca:
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
    setListShowed([...listShowed, voca]);
    setVoca({});
    if (list.length) {
      introAnimationIn();
    }
    // in again
  };
  React.useEffect(() => {
    setTimeout(() => {
      introAnimationIn();
    }, 2000);
  }, []);

  return (
    <div className={classes.Step2StudyUI}>
      <Container>
        List Items
        <ul>
          {study.vocas.map((el) => (
            <li key={el.id}>{el.voca}</li>
          ))}
        </ul>
      </Container>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => actionUpdate({ ...study, step: 1 })}
      >
        Reset
      </h2>
      <CSSTransition
        in={Boolean(isActiveIntroVoca)}
        timeout={duration}
        classNames="voca-cover"
        onEntered={handleAfterEnter}
        onExited={handleAfterExit}
      >
        <CoverVoca
          callback={introAnimationOut}
          isActive={isActiveIntroVoca}
          voca={voca}
        />
      </CSSTransition>
    </div>
  );
}

// COVER VOCA COMPONENT
const useStyles1 = makeStyles((theme) => ({
  VocaCover: {
    display: "inline-block",
    minWidth: "300px",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    position: "absolute",
    textAlign: "Center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // intro-voca-animation
    "&.voca-cover-enter": {
      opacity: 0,
      top: 0,
    },
    "&.voca-cover-enter-active": {
      opacity: 1,
      top: "50%",
      transition: `all ${duration}ms ease-in`,
    },
    "&.voca-cover-exit": {
      opacity: 1,
      top: "50%",
    },
    "&.voca-cover-exit-active": {
      opacity: 0,
      top: 0,
      transition: `all ${duration}ms ease-in`,
    },
    // voca in intro-voca:
    "& .jp.enter": {
      opacity: 0,
    },
    "& .jp.enter-active": {
      opacity: 1,
      transition: `opacity ${duration}ms ease-in`,
    },
    "& .jp.exit": {
      opacity: 1,
    },
    "& .jp.exit-active": {
      opacity: 0,
      transition: `opacity ${duration}ms ease-in`,
    },
  },
}));

// const fields = ["voca", "meaning", "sentence"];
function CoverVoca({ voca = {}, isActive, callback }) {
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
    speechSynthesis.cancel();
  }, [isActive]);
  return (
    <Paper elevation={3} className={classes.VocaCover}>
      <TransitionGroup className="group">
        {run1 >= 1 && (
          <CSSTransition
            className="jp"
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
            className="jp"
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
            className="jp"
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
