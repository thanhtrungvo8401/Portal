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

// MAIN UI
const useStyles = makeStyles(() => ({
  Step2StudyUI: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
  },
}));
const duration = 500;

export default function Step2StudyUI({ study }) {
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
      <div onClick={() => setActiveVocaCover(!activeVocaCover)}>Toggle</div>
      <CSSTransition
        in={activeVocaCover}
        timeout={duration}
        classNames="voca-cover"
      >
        <CoverVoca isActive={activeVocaCover} voca={list[0]} />
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

const readJP = (jpTxt, action) => {
  console.log(jpTxt);
  setTimeout(() => action(), 2000);
};
const fields = ["voca", "meaning", "sentence"];
function CoverVoca({ voca = {}, isActive }) {
  const classes = useStyles1();
  const [order, setOrder] = React.useState(0);
  const nextRun = () => {
    if (order < 3) {
      setOrder(order + 1);
    }
  };
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        nextRun();
      }, duration);
    }
  }, [isActive]);
  return (
    <Paper elevation={3} className={classes.VocaCover}>
      <TransitionGroup className="group">
        {order >= 1 && (
          <CSSTransition
            className="jp"
            key={1}
            timeout={duration}
            onEntered={() => readJP(voca[fields[0]], nextRun)}
          >
            <div>
              <Typography variant="h5">{voca.voca}</Typography>
              <Typography variant="caption" style={{ display: "block" }}>
                {voca.note}
              </Typography>
            </div>
          </CSSTransition>
        )}
        {order >= 2 && (
          <CSSTransition
            className="jp"
            key={2}
            timeout={duration}
            onEntered={() => readJP(voca[fields[1]], nextRun)}
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
        {order >= 3 && (
          <CSSTransition
            className="jp"
            key={3}
            timeout={duration}
            onEntered={() => readJP(voca[fields[2]], nextRun)}
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
