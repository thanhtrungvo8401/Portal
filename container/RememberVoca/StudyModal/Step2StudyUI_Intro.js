import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React from "react";
import { jpSpeak, otherSpeack } from "../../../utils/textToSpeech";
import { animationDuration } from "./StudyModal";
import theme from "../../../components/theme";

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
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.voca-intro-enter-done": {
      opacity: 1,
      top: "50%",
      transform: "translateY(-50%) translateX(-50%)",
      transition: `all ${animationDuration}ms ease-in`,
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
      transition: `all ${animationDuration}ms ease-in`,
    },
    // voca in intro-voca:
    "& .jp-enter": {
      opacity: 0,
    },
    "& .jp-enter-active": {
      opacity: 1,
      transition: `opacity ${animationDuration}ms ease-in`,
    },
    "& .jp-exit": {
      opacity: 1,
    },
    "& .jp-exit-active": {
      opacity: 0,
      transition: `opacity ${animationDuration}ms ease-in`,
    },
  },
}));

// const fields = ["voca", "meaning", "sentence"];
export default function IntroVoca({ voca = {}, isActive, callback }) {
  const classes = useStyles1();
  const [run1, setRun1] = React.useState(0);
  // render UI and speak voca, meaning one by one time 1:
  const nextRun1 = () => {
    if (run1 < 2) setRun1(run1 + 1);
    else runStep2();
  };
  // speak voca, meaning one by one time 2:
  const runStep2 = () => {
    jpSpeak({ content: voca["voca"] })
      .then(() => {
        return otherSpeack({ content: voca["meaning"] });
      })
      .then(() => {
        callback();
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        nextRun1();
      }, animationDuration);
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
            timeout={animationDuration}
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
            timeout={animationDuration}
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
      </TransitionGroup>
    </Paper>
  );
}
