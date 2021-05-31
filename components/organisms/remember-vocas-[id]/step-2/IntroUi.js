import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React from "react";
import { jpSpeak, otherSpeack } from "utils/textToSpeech";
import MicNoneIcon from "@material-ui/icons/MicNone";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ListeningAnimation from "components/SpeakerAnimation/Listening";
import TypingGif from "components/SpeakerAnimation/TypingGif";
import { jpRecognition } from "utils/speechToText";
import { jpPronouceCompair } from "utils/kanjiConverter";
import theme from "components/theme";
import DividerItem from "components/atoms/devider-item";
import { constantApp } from "utils/Constant";
import { cssAnimationHelper } from "utils/AnimationHelper";

// INTRO VOCA COMPONENT
const useStyles1 = makeStyles((theme) => ({
  VocaIntro: {
    display: "inline-block",
    minWidth: "300px",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    position: "fixed",
    zIndex: 2,
    textAlign: "Center",
    top: "50%",
    left: "50%",
    transform: "translateY(-100%) translateX(-50%)",
    top: 0,
    opacity: 0,
    // intro-voca-animation
    ...cssAnimationHelper("voca-intro",
      {
        opacity: 0,
        top: 0,
        transform: "translateY(-100%) translateX(-50%)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        top: "50%",
        transform: "translateY(-50%) translateX(-50%)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      true
    ),
    // voca in intro-voca:
    ...cssAnimationHelper("jp", {
      opacity: 0,
      transition: `opacity ${animationDuration}ms ease-in`,
    }, {
      opacity: 1,
      transition: `opacity ${animationDuration}ms ease-in`,
    }, false),
  },
  RenshiuItem: {
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& input.MuiInputBase-input": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
    "& .error-color": {
      "& input.MuiInputBase-input": {
        color: theme.palette.error.main
      },
    }
  },
  typingGifPosition: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-100%, -50%)",
  }
}));
const { animationDuration } = constantApp
const RENSHIU_NUM = 2;


export default function IntroVoca({
  voca = {},
  isActive,
  callback,
}) {
  const classes = useStyles1();
  const [run1, setRun1] = React.useState(1);
  const [renshiuValue, setRenshiuValue] = React.useState([]);
  const [microStatus, setMicroStatus] = React.useState([]);
  const [checkRenshiu, setCheckRenshiu] = React.useState([]);
  const [_isRenshiuFinish, setIsRenShiuFinish] = React.useState(false);
  const _currentSpeakingId = React.useRef(null);

  const updateRenshiuValue = (newValue = {}) => {
    const newRenshiuValue = renshiuValue.map((el) =>
      el.id === newValue.id
        ? { ...newValue }
        : el
    );
    setRenshiuValue(newRenshiuValue);
  };
  const updateMicroStatus = (newStatus = {}) => {
    const newMicroStatus = microStatus.map((el) =>
      el.id === newStatus.id
        ? { ...newStatus }
        : el
    );
    setMicroStatus(newMicroStatus);
  }
  const createNewRenshiu = () => {
    if (renshiuValue.length <= RENSHIU_NUM) {
      const _id = Date.now().toString();
      setRenshiuValue([...renshiuValue, { id: _id, voca: "" }]);
      setMicroStatus([...microStatus, { id: _id, isListening: false, isSpeaking: false }])
    } else {
      setIsRenShiuFinish(true);
    }
  }
  const speakJp = () => {
    jpSpeak({ content: voca["voca"] })
      .then(() => {
        nextRun1();
      })
      .catch((err) => console.log(err));
  }
  const speakOther = () => {
    otherSpeack({ content: voca["meaning"] })
      .then(() => {
        nextRun1();
      })
      .catch((err) => console.log(err));
  }
  // 01: render UI and speak voca, meaning one by one time 1:
  const nextRun1 = () => {
    if (run1 < 2) setRun1(run1 + 1);
    else runStep2();
  };
  // 02: speak voca, meaning one by one time 2:
  const runStep2 = () => {
    jpSpeak({ content: voca["voca"] })
      .then(() => {
        return otherSpeack({ content: voca["meaning"] });
      })
      .then(() => {
        runStep3();
      })
      .catch((err) => console.log(err));
  };
  // 03: speak voca, meaning one by one time 2:
  const runStep3 = () => {
    jpSpeak({ content: voca["voca"] })
      .then(() => {
        return otherSpeack({ content: voca["meaning"] });
      })
      .then(() => {
        createNewRenshiu();
      })
      .catch((err) => console.log(err));
  }
  // SPEECH RECOGNITION Handler:
  const onStart = () => {
    updateMicroStatus({ id: _currentSpeakingId.current, isListening: true, isSpeaking: false });
  };
  const onSpeechStart = () => {
    updateMicroStatus({ id: _currentSpeakingId.current, isListening: true, isSpeaking: true });
  };
  const onSpeechEnd = () => {
    updateMicroStatus({ id: _currentSpeakingId.current, isListening: false, isSpeaking: false });
  };

  const startRecognition = (_id) => {
    _currentSpeakingId.current = _id; // update id;
    jpRecognition({ onStart, onSpeechStart, onSpeechEnd })
      .then((result) => {
        const renshiu = renshiuValue.find((el) => el.id === _id);
        updateRenshiuValue({ ...renshiu, voca: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 00: EVENT TO START:
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        nextRun1();
      }, animationDuration);
    } else {
      setRun1(0);
      setRenshiuValue([]);
      setMicroStatus([]);
      setCheckRenshiu([]);
      setIsRenShiuFinish(false);
    }
  }, [isActive]);

  React.useEffect(() => {
    const changedVoca = renshiuValue.find(el => el.id === _currentSpeakingId.current) || {};
    jpPronouceCompair(changedVoca.voca, voca.voca)
      .then(isTrue => {
        setCheckRenshiu(renshiuValue.map((el, i) => el.id === _currentSpeakingId.current ? isTrue : checkRenshiu[i]));
      })
      .catch(err => {
        console.log(err);
      })
  }, [renshiuValue]);


  const isAllowClickMicro = microStatus.reduce((acc, current) => acc && (!current.isListening && !current.isSpeaking), true);
  const isValidToNextVoca = checkRenshiu.reduce((acc, current) => acc && current, true);

  return (
    <Paper elevation={3} className={classes.VocaIntro}>
      <TransitionGroup className="group">
        {/* VOCA */}
        {run1 >= 1 && (
          <CSSTransition
            classNames="jp"
            key={1}
            timeout={animationDuration}
            onEntered={speakJp}
          >
            <Box component="div">
              <Typography variant="h5">{voca.voca}</Typography>
              {/* When renshiu => hide higarana */}
              {Boolean(!renshiuValue.length) && (
                <Typography variant="caption" style={{ display: "block" }}>
                  {voca.note}
                </Typography>
              )}
            </Box>
          </CSSTransition>
        )}
        {/* MEANING */}
        {/* When renshiu => hide meaning */}
        {run1 >= 2 && Boolean(!renshiuValue.length) && (
          <CSSTransition
            classNames="jp"
            key={2}
            timeout={animationDuration}
            onEntered={speakOther}
          >
            <Box component="div">
              <DividerItem isHasLine={true} />
              <Typography variant="body2">{voca.meaning}</Typography>
            </Box>
          </CSSTransition>
        )}
        {/* RENSHIU LIST */}
        {renshiuValue.map((renshiu, index) => {
          if (!_isRenshiuFinish && index !== renshiuValue.length - 1) return null;
          const { isListening, isSpeaking } = microStatus.find(el => el.id === renshiu.id) || {};
          const isValidVoca = checkRenshiu[index];
          return (
            <CSSTransition classNames="jp" key={renshiu.id} timeout={animationDuration}>
              <Box component="div" className={classes.RenshiuItem}>
                <DividerItem isHasLine={true} />
                {/* JP Speech */}
                {!_isRenshiuFinish &&
                  <Typography
                    style={{ textAlign: "left", display: "block" }}
                    variant={"caption"}
                  >
                    Click vào micro và đọc lại từ vựng trên
                  </Typography>
                }
                <FormControl className={!isValidVoca ? 'error-color' : ''} style={{ width: "100%", position: "relative" }}>
                  <Input
                    type="text"
                    value={renshiu.voca}
                    placeholder={!isListening ? ". . ." : ""}
                    onChange={(e) => {
                      _currentSpeakingId.current = renshiu.id;
                      updateRenshiuValue({ ...renshiu, voca: e.target.value });
                    }
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <ListeningAnimation isActive={isListening}>
                          <IconButton
                            size="small"
                            style={{ transform: "translateX(0.5px)" }}
                            onClick={() => {
                              startRecognition(renshiu.id);
                            }}
                            disabled={!isAllowClickMicro}
                          >
                            <MicNoneIcon
                              color={isListening ? "error" : "action"}
                            />
                          </IconButton>
                        </ListeningAnimation>
                        <Box
                          hidden={!isSpeaking}
                          className={classes.typingGifPosition}
                        >
                          <TypingGif
                            size="0.5rem"
                            jumpHeight="3px"
                            spacing={"8px"}
                          />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      {/* started renshiu && voca and meaning was entered && before finish renshiu */}
      {!_isRenshiuFinish &&
        !!renshiuValue.length &&
        <Button color="primary"
          disabled={!renshiuValue[renshiuValue.length - 1].voca}
          style={{ marginBottom: '-12px' }}
          onClick={() => createNewRenshiu()} >
          <KeyboardArrowDownIcon />
        </Button>}

      {_isRenshiuFinish &&
        <Button color="primary"
          disabled={!isValidToNextVoca}
          style={{ marginTop: theme.spacing(1) }}
          onClick={() => callback()}>
          Next
        </Button>}

      {_isRenshiuFinish &&
        !isValidToNextVoca &&
        <Typography color="error" >
          Dùng micro hoặc bàn phím để sửa lại kết quả cho đúng trước khi đi đến từ vựng tiếp theo
      </Typography>}
    </Paper >
  );
}
