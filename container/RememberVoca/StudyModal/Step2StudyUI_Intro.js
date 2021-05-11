import {
  Box,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React from "react";
import { jpSpeak, otherSpeack } from "../../../utils/textToSpeech";
import { animationDuration } from "./StudyModal";
import MicNoneIcon from "@material-ui/icons/MicNone";
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import ListeningAnimation from "../../../components/SpeakerAnimation/Listening";
import TypingGif from "../../../components/SpeakerAnimation/TypingGif";
import { getRandom } from "../../../utils/Helper";
import { Autocomplete } from "@material-ui/lab";
import { VOCA_RANDOM_LIMIT } from "../../../utils/Constant";
import { jpRecognition } from "../../../utils/speechToText";

const generateMeaningOptions = (voca, listRandom = []) => {
  if (listRandom.length !== VOCA_RANDOM_LIMIT) return [];
  const list = [...listRandom, voca];
  const results = new Set();
  while (list.length > 0) {
    const rand = getRandom(0, list.length - 1);
    if (!list[rand].meaning) console.log(list[rand]);
    if (list[rand].meaning) results.add(list[rand].meaning);
    list.splice(rand, 1);
  }
  return Array.from(results);
};

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
  Divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  Autocomplete: {
    "& .MuiFormControl-root": {
      margin: "0!important",
    },
  },
}));

export default function IntroVoca({
  voca = {},
  isActive,
  callback,
  randVocas = [],
}) {
  const classes = useStyles1();
  const [meaningOptions, setMeaningOptions] = React.useState([]);
  const [run1, setRun1] = React.useState(1);
  const [renshiuValue, setRenshiuValue] = React.useState([]);
  const [microStatus, setMicroStatus] = React.useState([])
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
    const _id = Date.now().toString();
    setRenshiuValue([...renshiuValue, { id: _id, voca: "", meaning: "" }]);
    setMicroStatus([...microStatus, { id: _id, isListening: false, isSpeaking: false }])
  }
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
        createNewRenshiu();
      })
      .catch((err) => console.log(err));
  };
  // Speech Recognition Handler:
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
  // Event to start rendering and speaking:
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        nextRun1();
      }, animationDuration);
    } else {
      setRun1(0);
    }
  }, [isActive]);

  React.useEffect(() => {
    // check randVocas and voca is valid => generate meaning options:
    if (randVocas.length && voca.voca) {
      setMeaningOptions(generateMeaningOptions(voca, randVocas));
    }
  }, [randVocas, voca])
  return (
    <Paper elevation={3} className={classes.VocaIntro}>
      <TransitionGroup className="group">
        {/* VOCA */}
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
            onEntered={() => {
              otherSpeack({ content: voca["meaning"] })
                .then(() => {
                  nextRun1();
                })
                .catch((err) => console.log(err));
            }}
          >
            <Box component="div">
              <Divider className={classes.Divider} />
              <Typography variant="body2">{voca.meaning}</Typography>
            </Box>
          </CSSTransition>
        )}
        {/* RENSHIU LIST */}
        {renshiuValue.map((renshiu, index) => {
          const { isListening, isSpeaking } = microStatus.find(el => el.id === renshiu.id) || {};
          return (
            <CSSTransition classNames="jp" key={renshiu.id} timeout={animationDuration}>
              <Box component="div" className={classes.RenshiuItem}>
                <Divider className={classes.Divider} />
                {/* JP Speech */}
                {index === renshiuValue.length - 1 && <Typography
                  style={{ textAlign: "left", display: "block" }}
                  variant={"caption"}
                >
                  Click vào micro và đọc lại từ vựng trên
                </Typography>}
                <FormControl className={true ? '' : 'error-color'} style={{ width: "100%", position: "relative" }}>
                  <Input
                    type="text"
                    value={!isListening ? renshiu.voca : ""}
                    placeholder={!isListening ? ". . ." : ""}
                    onChange={(e) =>
                      updateRenshiuValue({ ...renshiu, voca: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <ListeningAnimation isActive={isListening}>
                          <IconButton
                            size="small"
                            style={{ transform: "translateX(0.5px)" }}
                            onClick={() => startRecognition(renshiu.id)}
                          >
                            <MicNoneIcon
                              color={isListening ? "error" : "action"}
                            />
                          </IconButton>
                        </ListeningAnimation>
                        <Box
                          hidden={!isSpeaking}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-100%, -50%)",
                          }}
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
                {/* Meaning */}
                {index === renshiuValue.length - 1 && <Typography
                  style={{ textAlign: "left", display: "block" }}
                  variant={"caption"}
                >
                  Nghĩa của từ
                </Typography>}
                <Autocomplete
                  className={classes.Autocomplete}
                  id={`renshiu-meaning-${renshiu.id}-meaning`}
                  freeSolo
                  options={meaningOptions}
                  renderInput={(param) => {
                    return (
                      <TextField
                        {...param}
                        margin="normal"
                        variant="standard"
                        placeholder={". . ."}
                        className={true ? '' : 'error-color'}
                      />
                    );
                  }}
                  onChange={(e, selectValue, result) =>
                    updateRenshiuValue({ ...renshiu, meaning: selectValue })
                  }
                  value={renshiu.meaning}
                />
              </Box>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      {renshiuValue.length > 0 && <IconButton onClick={() => createNewRenshiu()} >
        <PlayForWorkIcon color="primary" />
      </IconButton>}
    </Paper>
  );
}
