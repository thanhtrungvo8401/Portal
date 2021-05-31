import {
  Box,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import DataUsageIcon from '@material-ui/icons/DataUsage';

import React from "react";
import { getRandom } from "utils/Helper";
import { jpSpeak } from "utils/textToSpeech";
import theme from "components/theme";
import { constantApp } from "utils/Constant";

// LIST COMPONENT
const { animationDuration } = constantApp;
const useStyles2 = makeStyles((theme) => ({
  DisplayVocas: {
    position: "relative",
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing(2),
    "& .one-voca": {
      transition: `all ${animationDuration}ms ease-in`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(1),
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      zIndex: 0,
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
  BtnGroup: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4),
    }
  },
  RandomVocaQuestion: {
    position: "absolute",
    width: "100%",
    height: "100%",
    minHeight: "200px",
    opacity: 0.96,
    top: "0",
    left: "100vw",
    opacity: 0,
    zIndex: 3,
    cursor: "pointer",
    "&.random-speak-enter": {
      left: "100%!important",
      opacity: '0!important',
    },
    "&.random-speak-enter-active": {
      left: "0%!important",
      opacity: '1!important',
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.random-speak-enter-done": {
      left: "0%",
      opacity: '1!important',
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.random-speak-exit": {
      opacity: '1!important',
      left: "0%!important",
    },
    "&.random-speak-exit-active": {
      left: "100vw!important",
      opacity: '0!important',
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.random-speak-exit-done": {
      left: "100vw!important",
      opacity: '0!important',
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .meaning": {
      opacity: 0,
    },
    "& .meaning-enter": {
      opacity: 0,
    },
    "& .meaning-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .meaning-exit": {
      opacity: 1,
    },
    "& .meaning-exit-active": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
  }
}));
export default function DisplayVocas({ vocas = [], isFinishIntro }) {
  const classes = useStyles2();
  const [vocasRender, setVocasRender] = React.useState([]);
  const [vocasRandomSpeak, setVocasRandomSpeak] = React.useState([]);
  const [isShowAnswer, setShowAnswer] = React.useState(false);
  const [isRandomSpeak, setIsRandomSpeak] = React.useState(false);
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
  const handleSpeakRandom = () => {
    if (isRandomSpeak) {
      return setIsRandomSpeak(false);
    }
    if (vocasRandomSpeak.length < vocas.length) {
      const notSpokenVocalist = vocas.filter(el =>
        !vocasRandomSpeak.map(el => el.id)
          .includes(el.id)
      );
      const randVoca = notSpokenVocalist[getRandom(0, notSpokenVocalist.length - 1)];
      setVocasRandomSpeak([...vocasRandomSpeak, randVoca]);
      jpSpeak({ content: randVoca.voca })
    } else {
      const randVoca = vocas[getRandom(0, vocas.length - 1)];
      setVocasRandomSpeak([randVoca]);
      jpSpeak({ content: randVoca.voca })
    }
    setIsRandomSpeak(true);
  }
  React.useEffect(() => {
    if (vocas.length) {
      setVocasRender([
        { ...vocas[vocas.length - 1], isShow: false },
        ...vocasRender,
      ]);
    }
  }, [vocas]);
  const currentRandVoca = vocasRandomSpeak[vocasRandomSpeak.length - 1] || {};
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
                  onClick={() => {
                    jpSpeak({ content: voca.voca });
                  }}
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
                    style={{ display: "flex", alignItems: "center", zIndex: 2 }}
                  >
                    <GTranslateIcon
                      onClick={() => {
                        handleToggleShowMeaning(voca.id)
                      }}
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
      {isFinishIntro && <ButtonGroup
        className={classes.BtnGroup}
        color="primary"
        aria-label="outlined primary button group"
        variant="outlined"
      >
        <Button onClick={() => handleRandomVoca()}>
          <SyncRoundedIcon style={{ marginRight: theme.spacing(1) }} />
          Trộn từ
        </Button>
        <Button onClick={() => handleSpeakRandom()}>
          <DataUsageIcon style={{ marginRight: theme.spacing(1) }} />
          Random Speak
        </Button>
      </ButtonGroup>}
      <CSSTransition
        in={isRandomSpeak}
        timeout={animationDuration}
        classNames="random-speak"
        onExited={() => setShowAnswer(false)}
      >
        <Paper
          className={classes.RandomVocaQuestion}
          onClick={() => setShowAnswer(true)}
        >
          {!isShowAnswer &&
            <Box
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography
                variant="h1"
                component="label"
              >?</Typography>
              <Typography>
                Click nếu bạn đã nhớ ra câu trả lời
            </Typography>
            </Box>
          }
          <CSSTransition
            in={isShowAnswer}
            timeout={animationDuration}
            classNames="meaning"
            onEntered={() => {
              setIsRandomSpeak(false);
            }}
          >
            <Typography
              variant="h6"
              component="label"
              className="meaning"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }}
            >
              {currentRandVoca.meaning}
            </Typography>
          </CSSTransition>
        </Paper>
      </CSSTransition>
    </Container >
  );
}
