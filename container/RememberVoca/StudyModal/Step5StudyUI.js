import {
  Box,
  Button,
  ButtonGroup,
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
import { jpSpeak } from "../../../utils/textToSpeech";
import { navigate } from "../../../utils/Helper";
import { appUrl } from "../../../utils/APP_URL";
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
    marginTop: theme.spacing(1),
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
  Summary: {
    textAlign: "center",
    marginTop: theme.spacing(2)
  }
}));

const COUNT_TIME = 3000;
export default function Step5StudyUI({ QAndA, QandAOptions, submitQAndA, getNewQAndA, number, total, isFinish, listQAndA }) {
  const classes = useStyles();
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [storedQAndA, setStoreQAndA] = React.useState({});
  const [storedOptions, setStoredOptions] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [summary, setSummary] = React.useState({ percent: 0, timeAvarage: 0 });
  const keyName = QAndA.type === QA_TYPE.MEANING
    ? "voca"
    : "meaning";
  const intervalId = React.useRef();
  const counterIncrease = () => setCount(count + 20);

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
  const selectOptions = (option) => {
    if (storedOptions.length > 0) {
      const newStoredOptions = storedOptions.map(el => {
        return el.value === option.value
          ? { ...option, selected: true }
          : el
      });
      setStoredOptions(newStoredOptions);
    };
  };
  const checkForSubmitQAndA = () => {
    const selectedList = storedOptions
      .filter(el => el.selected)
      .map(el => el.value);
    const isExact = selectedList.includes(QAndA[keyName]);
    const time = count > COUNT_TIME ? COUNT_TIME : count;
    if (isExact || time >= COUNT_TIME) {
      setCount(0);
      clearInterval(intervalId.current);
      submitQAndA({ ...QAndA, time, isExact })
    };
  };

  React.useEffect(() => {
    if (QAndA && QAndA.id) {
      setStoreQAndA(QAndA);
      if (count > 0) setCount(0);
    }
  }, [QAndA]);
  React.useEffect(() => {
    if (QandAOptions.length) {
      setStoredOptions(QandAOptions.map(el => ({ value: el, selected: false })));
    }
  }, [QandAOptions.length]);
  React.useEffect(() => {
    if (count > 0 && count < COUNT_TIME) {
      intervalId.current = setInterval(() => {
        counterIncrease();
      }, [20]);
    } else if (count >= COUNT_TIME) {
      checkForSubmitQAndA();
    }
    return () => clearInterval(intervalId.current)
  }, [count]);
  React.useEffect(() => {
    checkForSubmitQAndA();
  }, [storedOptions]);
  React.useEffect(() => {
    if (isFinish) {
      const totalRight = listQAndA.reduce((acc, current) => current.isExact ? acc + 1 : acc, 0);
      const totalTime = listQAndA.reduce((acc, current) => acc + current.time, 0);
      setSummary({
        percent: totalRight / total,
        timeAvarage: totalTime / total
      })
    }
  }, [isFinish]);
  if (isFinish) {
    return <section className={`${classes.Step5StudyUI}`} >
      <Container className={`${classes.Summary}`}>
        <Typography variant="h6" color="textSecondary" >Kết quả</Typography>
        <Typography variant="h4" color="primary">
          {Number(summary.percent * 100).toFixed(2)} %
        </Typography>

        <Typography
          variant="h6" color="textSecondary"
          style={{ marginTop: theme.spacing(1) }}
        >
          Thời gian trung bình
        </Typography>
        <Typography variant="h4" color="primary">
          {Number(summary.timeAvarage / 1000).toFixed(2)} s/câu
        </Typography>
        <ButtonGroup variant="outlined" color="primary">
          <Button
            onClick={() => navigate(appUrl.rememberVoca())}
            style={{ marginTop: theme.spacing(5) }} >
            Kết thúc
        </Button>
          <Button
            onClick={() => alert("Handle later")}
            style={{ marginTop: theme.spacing(5) }} >
            Thử lại
        </Button>
        </ButtonGroup>
      </Container>
    </section >
  }
  return <section className={classes.Step5StudyUI}>
    <Container component="div" className={classes.Top}>
      <Typography
        color="textSecondary"
        variant="subtitle2" >
        {number < 0 ? 1 : number + 1}/{total}
      </Typography>
      <CSSTransition
        in={Boolean(QAndA.id)}
        onEntered={() => startQAndA()}
        onExited={() => getNewQAndA()}
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
  </section >
};
