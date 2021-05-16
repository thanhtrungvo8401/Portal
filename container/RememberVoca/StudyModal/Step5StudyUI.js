import {
  Box,
  Chip,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { animationDuration, styleStep_X_StudyUI } from "./StudyModal";
import HearingIcon from '@material-ui/icons/Hearing';
import ListeningAnimation from "../../../components/SpeakerAnimation/Listening";
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import theme from "../../../components/theme";
import DoneIcon from '@material-ui/icons/Done';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { QA_TYPE } from "./Step5Study";
import React from "react";
import { CSSTransition } from "react-transition-group";
const useStyles = makeStyles(theme => ({
  Step5StudyUI: styleStep_X_StudyUI,
  Top: {
    marginTop: theme.spacing(2),
    position: "relative",
    "& .QAndA-enter": {
      opacity: 0
    },
    "& .QAndA-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .QAndA-enter-done": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .QAndA-exit": {
      opacity: 1
    },
    "& .QAndA-exit-active": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .QAndA-exit-done": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    }
  },
  Middle: {
    marginTop: theme.spacing(6),
    position: "relative",
    width: "4rem",
    height: "4rem",
    margin: "0 auto"
  },
  Bottom: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "space",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    "&.options-enter": {
      opacity: 0
    },
    "&.options-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.options-enter-done": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.options-exit": {
      opacity: 1
    },
    "&.options-exit-active": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.options-exit-done": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    }
  },
}))


export default function Step5StudyUI({ QAndA, QandAOptions, submitQAndA, getNewQAndA, number }) {
  const classes = useStyles();
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [storedQAndA, setStoreQAndA] = React.useState({});
  const [storedOptions, setStoredOptions] = React.useState([]);

  React.useEffect(() => {
    if (QAndA && QAndA.id) {
      setStoreQAndA(QAndA);
    }
  }, [QAndA]);
  React.useEffect(() => {
    if (QandAOptions.length) {
      setStoredOptions(QandAOptions);
    }
  }, [QandAOptions.length])
  const renderQuestion = () => {
    switch (QAndA.type) {
      case QA_TYPE.JP:
        return <Paper
          elevation={3}
          style={{ padding: `${theme.spacing(1)}px ${theme.spacing(2)}px` }}
        >
          <Typography variant="h6" color="primary">
            {storedQAndA["voca"]}
          </Typography>
        </Paper>
      case QA_TYPE.MEANING:
        return <Paper
          elevation={3}
          style={{ padding: `${theme.spacing(1)}px ${theme.spacing(2)}px` }}
        >
          <Typography variant="h6" color="textSecondary">
            {storedQAndA["meaning"]}
          </Typography>
        </Paper>
      case QA_TYPE.SOUND:
        return <ListeningAnimation isActive={isSpeaking} >
          <HearingIcon style={{ fontSize: "2rem" }} color="primary" />
        </ListeningAnimation>
      default:
        return null;
    }
  };
  return <section className={classes.Step5StudyUI}>
    <Container component="div" className={classes.Top}>
      <Typography
        color="textSecondary"
        variant="subtitle2" >
        {number < 0 ? 0 : number}/21
      </Typography>
      <CSSTransition
        in={Boolean(QAndA.id)}
        timeout={animationDuration}
        classNames="QAndA" >
        <Box style={{
          position: "absolute",
          left: "50%",
          top: "0",
          transform: "translateX(-50%)"
        }} >
          {renderQuestion()}
        </Box>
      </CSSTransition>
    </Container>
    <Box component="div" className={classes.Middle}>
      <AccessAlarmsIcon style={{
        fontSize: "2rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }} color="primary" />
      <CircularProgress
        variant="determinate"
        value={60}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          opacity: 0.5
        }}
      />
    </Box>
    <CSSTransition
      in={Boolean(QandAOptions.length)}
      timeout={animationDuration}
      classNames="options"
    >
      <Container component="div" className={classes.Bottom}>
        {storedOptions.map((el, i) => {
          return <Chip
            key={i}
            label={el}
            size="medium"
            clickable
            color="primary"
            style={{ marginBottom: theme.spacing(1) }}
            onDelete={() => { }}
            onClick={() => { }}
            deleteIcon={i % 2 === 0 ? <DoneIcon /> : <HighlightOffIcon />}
          />
        })}
      </Container>
    </CSSTransition>
  </section >
}
