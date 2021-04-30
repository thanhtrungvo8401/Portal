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
import { jpSpeak } from "../../../utils/textToSpeech";

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
  const list = [...study.vocas];
  const listDone = [];

  const [activeVocaCover, setActiveVocaCover] = React.useState(false);
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
      <div
        onClick={() => {
          if (!activeVocaCover) {
            setActiveVocaCover(!activeVocaCover);
          } else {
            actionUpdate({
              ...study,
              step: 1,
            });
          }
        }}
      >
        Toggle
      </div>
      <CSSTransition
        in={activeVocaCover}
        timeout={duration}
        classNames="voca-cover"
      >
        <CoverVoca isActive={activeVocaCover} voca={list[4]} />
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

const fields = ["voca", "meaning", "sentence"];
function CoverVoca({ voca = {}, isActive }) {
  const classes = useStyles1();
  const [run1, setRun1] = React.useState(0);
  const nextRun1 = () => {
    if (run1 < 2) {
      setRun1(run1 + 1);
    } else if (run1 == 2 && voca.sentence) {
      setRun1(run1 + 1);
    } else {
      alert("DONE");
    }
  };
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        nextRun1();
      }, duration);
    }
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
              jpSpeak({ content: voca["voca"] }).then((res) => {
                console.log(res);
                nextRun1();
              });
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
            onEntered={() => nextRun1()}
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
              jpSpeak({ content: voca["voca"] }).then((res) => {
                console.log(res);
                nextRun1();
              });
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
