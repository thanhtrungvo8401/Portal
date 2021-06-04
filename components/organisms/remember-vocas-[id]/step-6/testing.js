import React from "react";
import { Box, Chip, CircularProgress, Container, makeStyles, Typography } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import { CSSTransition } from "react-transition-group";
import { cssAnimationHelper } from "utils/AnimationHelper";
import { constantApp } from "utils/Constant";

const useStyles = makeStyles(theme => ({
  Top: {
    marginTop: theme.spacing(2),
    position: "relative",
    ...cssAnimationHelper('QAndA',
      {
        opacity: 0,
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      false
    ),
  },
  Middle: {
    marginTop: theme.spacing(6),
    position: "relative",
    width: "4rem",
    height: "4rem",
    margin: "0 auto"
  },
  Bottom: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    position: "relative",
    ...cssAnimationHelper('options',
      {
        opacity: 0,
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      true
    ),
  },
  Summary: {
    textAlign: "center",
    marginTop: theme.spacing(6)
  }
}));

export default function Testing({ position, QandA }) {
  const classes = useStyles();
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
  const startQAndA = () => {
  if (QAndA.type === QA_TYPE.SOUND) {
    setIsSpeaking(true);
    jpSpeak({ content: QAndA.voca })
      .then(res => {
        counterIncrease();
        setIsSpeaking(false);
      })
      .catch(err => {
        console.log(err);
        setIsSpeaking(false);
      })
  } else {
    counterIncrease();
  }
};
  return <React.Fragment>
    <Container component="div" className={classes.Top}>
      <Typography
        style={{ textAlign: "center", marginBottom: theme.spacing(1) }}
        color="textSecondary"
        variant="subtitle2" >
        {position < 0 ? 1 : position + 1}/{total}
      </Typography>
      <CSSTransition
        in={Boolean(QAndA.id)}
        onEntered={() => startQAndA()}
        onExited={() => getNewQAndA()}
        timeout={constantApp.animationDuration}
        classNames="QAndA" >
        <Box style={{
          textAlign: "center",
          minHeight: '6rem'
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
        value={-(100 - count * 100 / COUNT_TIME)}
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
    <Container style={{ marginTop: theme.spacing(6) }}>
      <Typography color="textSecondary"
        style={{ fontWeight: "bolder", textAlign: "center" }}
        variant="subtitle1" >
        Click vào đáp án đúng
  </Typography>
    </Container>
    <CSSTransition
      in={Boolean(QandAOptions.length)}
      timeout={animationDuration}
      classNames="options"
    >
      <Container component="div" className={classes.Bottom}>
        {storedOptions.map((el, i) => {
          const isTrueElement = QAndA[keyName] === el['value'];
          return <Chip
            key={i}
            label={el.value}
            size="medium"
            clickable
            color="primary"
            style={{ marginBottom: theme.spacing(1) }}
            onDelete={el.selected ? () => { } : null}
            onClick={() => selectOptions(el)}
            deleteIcon={isTrueElement ? <DoneIcon /> : <HighlightOffIcon />}
          />
        })}
      </Container>
    </CSSTransition>
  </React.Fragment >
}
