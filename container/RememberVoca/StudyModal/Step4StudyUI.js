import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import MicNoneIcon from "@material-ui/icons/MicNone";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CheckIcon from "@material-ui/icons/Check";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import React from "react";
import theme from "../../../components/theme";
import { animationDuration, styleStep_X_StudyUI } from "./StudyModal";
import { jpRecognition } from "../../../utils/speechToText";
import { getRandom } from "../../../utils/Helper";
import { jpConverter } from "../../../utils/kanjiConverter";
import { jpSpeak } from "../../../utils/textToSpeech";
import ListeningAnimation from "../../../components/SpeakerAnimation/Listening";
import TypingGif from "../../../components/SpeakerAnimation/TypingGif";

const CHECK_PRONOUCE = {
  TRUE: "TRUE",
  FALSE: "FALSE",
};
const useStyles = makeStyles((theme) => {
  return {
    Step4StudyUI: styleStep_X_StudyUI,
    Step4StudyUI_2: {
      paddingTop: theme.spacing(2),
      // Check Pronouce:
      "& .check-pronouce": {
        opacity: 0,
      },
      "& .check-pronouce-enter": {
        opacity: 0,
      },
      "& .check-pronouce-enter-active": {
        opacity: 1,
        transition: `all ${animationDuration}ms ease-in`,
      },
      "& .check-pronouce-enter-done": {
        opacity: 1,
        transition: `all ${animationDuration}ms ease-in`,
      },
      "& .check-pronouce-exit": {
        opacity: 1,
      },
      "& .check-pronouce-exit-active": {
        opacity: 0,
        transition: `all ${animationDuration}ms ease-in`,
      },
      "& .check-pronouce-exit-done": {
        opacity: 0,
        transition: `all ${animationDuration}ms ease-in`,
      },
    },
    listeningIcon: {
      animation: `$listeningAnimation 0.8s ${theme.transitions.easing.easeInOut} 200ms infinite`,
    },
    "@keyframes listeningAnimation": {
      "0%": {
        transform: "translateY(-10px)",
      },
      "50%": {
        transform: "translateY(0)",
      },
      "100%": {
        transform: "translateY(-10px)",
      },
    },
  };
});

export default function Step4StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
  const [list, setList] = React.useState(
    study.vocas.map((el) => ({ ...el, count: 0 }))
  );
  const [voca, setVoca] = React.useState({});
  const [resultRecog, setResultRecog] = React.useState("");
  const [resultConvert, setResultConvert] = React.useState("");
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [checkPronouce, setCheckPronouce] = React.useState("");
  const [isUseKeyBoard, setIsUseKeyBoard] = React.useState(false);
  const [isShowHint, setIsShowHint] = React.useState(false);
  const [isFinish, setIsFinish] = React.useState(false);

  // event
  const onStart = (e) => {
    resetData();
    setIsListening(true);
  };
  const onSpeechStart = (e) => {
    setIsSpeaking(true);
  };
  const onSpeechEnd = (e) => {
    setIsListening(false);
    setIsSpeaking(false);
  };
  // recognition handler:
  const startRecognition = async () => {
    try {
      const result_1 = await jpRecognition({
        onStart,
        onSpeechEnd,
        onSpeechStart,
      });
      return setResultRecog(result_1);
    } catch (e) {
      const { error, message } = e;
      console.log("onError", error, message);
      if (error === "no-speech") {
        setErrorMsg("Meomeo-kun không thể nghe được âm thanh từ bạn !!!");
      }
      resetData();
    }
  };
  // ---
  const nextVoca = () => {
    if (list.length > 0) {
      const randVoca = list[getRandom(0, list.length - 1)];
      setVoca(randVoca);
      randVoca.count++;
      if (randVoca.count < 2) {
        setList(list.map((el) => (el.id === randVoca.id ? randVoca : el)));
      } else {
        setList(list.filter((el) => el.id !== randVoca.id));
      }
    } else {
      setVoca({});
      setIsFinish(true);
    }
  };
  const resetData = () => {
    setResultRecog("");
    setResultConvert("");
    setIsListening(false);
    setIsSpeaking(false);
    setErrorMsg("");
    setCheckPronouce("");
    setIsUseKeyBoard(false);
  };

  React.useEffect(() => {
    nextVoca();
  }, []);
  React.useEffect(() => {
    jpConverter(resultRecog)
      .then((result) => setResultConvert(result))
      .catch((err) => console.log(err));
  }, [resultRecog]);
  React.useEffect(() => {
    if (resultConvert) {
      jpConverter(voca.voca)
        .then((result) => {
          if (result === resultConvert) {
            setCheckPronouce(CHECK_PRONOUCE.TRUE);
          } else {
            setCheckPronouce(CHECK_PRONOUCE.FALSE);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [resultConvert]);
  React.useEffect(() => {
    if (isFinish) {
      setTimeout(() => {
        actionUpdateBg({ step: 5 });
      }, animationDuration * 4);
    }
  }, [isFinish]);
  return (
    <section className={`${classes.Step4StudyUI} ${classes.Step4StudyUI_2}`}>
      {!isFinish && (
        <Container style={{ textAlign: "center" }}>
          {/* Intruction */}
          <Typography color="primary">
            Click vào (<MicNoneIcon style={{ transform: "translateY(5px)" }} />)
            và đọc thành tiếng từ ứng với nghĩa bên dưới
          </Typography>
          {/* Vietnamese Meaning */}
          <Paper
            elevation={3}
            style={{
              textAlign: "center",
              marginTop: theme.spacing(4),
              display: "block",
              padding: `${theme.spacing(1)}px 0px`,
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: "lighter",
              }}
              component="label"
              color="primary"
            >
              {voca.meaning}
            </Typography>
          </Paper>
          {/* Micro Icon */}
          <IconButton
            onClick={() => startRecognition()}
            disabled={Boolean(resultRecog)}
            style={{ marginTop: theme.spacing(4), position: "relative" }}
          >
            <ListeningAnimation isActive={isListening}>
              <MicNoneIcon
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: `${isListening ? theme.palette.error.main : ""}`,
                }}
              />
            </ListeningAnimation>
            <Typography
              color={isListening ? "error" : "textSecondary"}
              variant="caption"
              style={{
                position: "absolute",
                textAlign: "center",
                width: "200%",
                left: "50%",
                top: "100%",
                transform: "translate(-50%, -50%)",
                display: "block",
              }}
            >
              {isListening ? "Meomeo-kun đang lắng nghe..." : "Click to speak"}
            </Typography>
          </IconButton>
          {/* Result */}
          <Box component="div" style={{ marginTop: theme.spacing(6) }}>
            {isSpeaking && <TypingGif
              size="1rem"
              jumpHeight="10px"
              spacing="5px" />
            }
            {resultRecog && (
              <Typography
                variant="h3"
                component="label"
                style={{ display: "block" }}
                color="textSecondary"
              >
                {resultRecog}
              </Typography>
            )}
            {resultConvert && (
              <Typography
                variant="h6"
                component="label"
                style={{ display: "block" }}
                color="textSecondary"
              >
                {resultConvert}
              </Typography>
            )}
            {errorMsg && (
              <Typography
                variant="h6"
                component="label"
                style={{ display: "block", fontWeight: "lighter" }}
                color="error"
              >
                {errorMsg}
              </Typography>
            )}
          </Box>
          {/* check Pronouce */}
          <CSSTransition
            classNames="check-pronouce"
            timeout={2 * animationDuration}
            in={checkPronouce === CHECK_PRONOUCE.TRUE}
            onEntered={() => {
              setCheckPronouce("");
            }}
            onExited={() => {
              resetData();
              nextVoca();
            }}
          >
            <Box
              className="check-pronouce"
              style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              <CheckIcon
                style={{ fontSize: "7rem", color: theme.palette.success.main }}
              />
              <Typography
                style={{ color: theme.palette.success.main }}
                variant="h6"
              >
                Chúc mừng bạn !!!
              </Typography>
            </Box>
          </CSSTransition>
          <CSSTransition
            classNames="check-pronouce"
            timeout={2 * animationDuration}
            in={checkPronouce === CHECK_PRONOUCE.FALSE}
          >
            <Box
              className="check-pronouce"
              style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              <MoodBadIcon
                style={{ fontSize: "7rem", color: theme.palette.error.main }}
              />
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                variant="text"
              >
                <Button
                  onClick={() => {
                    resetData();
                    startRecognition();
                  }}
                >
                  Thử lại
                </Button>
                <Button
                  onClick={() => {
                    resetData();
                    setIsUseKeyBoard(true);
                  }}
                >
                  Dùng bàn phím
                </Button>
                <Button
                  onClick={() => {
                    resetData();
                    setIsShowHint(true);
                    setList(
                      list.map((el) =>
                        el.id !== voca.id ? el : { ...el, count: el.count - 1 }
                      )
                    );
                    jpSpeak({ content: voca.voca })
                      .then((result) => {
                        setIsShowHint(false);
                      })
                      .catch((err) => {
                        console.log(err);
                        setIsShowHint(false);
                      });
                  }}
                >
                  Gợi ý
                </Button>
              </ButtonGroup>
            </Box>
          </CSSTransition>
          {/* KeyBoard Input */}
          {isUseKeyBoard && (
            <Paper
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                const input = document.getElementById("result-from-key-board");
                setResultRecog(input.value);
                setIsUseKeyBoard(false);
              }}
              style={{
                padding: "2px 4px",
                display: "flex",
                alignContent: "center",
                maxWidth: "350px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <InputBase
                placeholder="Điền vào kết quả của bạn"
                inputProps={{ "aria-label": "japanese vocabulary" }}
                style={{
                  marginLeft: theme.spacing(2),
                  flex: 1,
                }}
                id="result-from-key-board"
              />
              <Divider
                style={{
                  height: 32,
                  margin: "0 4px",
                  transform: "translateY(6px)",
                }}
                orientation="vertical"
              />
              <IconButton
                aria-label="enter-result"
                color="primary"
                style={{ padding: 10 }}
                onClick={() => {
                  const input = document.getElementById(
                    "result-from-key-board"
                  );
                  setResultRecog(input.value);
                  setIsUseKeyBoard(false);
                }}
              >
                <SubdirectoryArrowRightIcon />
              </IconButton>
            </Paper>
          )}
          {/* Show Hint */}
          {isShowHint && (
            <Typography variant="h4" color="textSecondary">
              {voca.voca}
            </Typography>
          )}
        </Container>
      )}
      {isFinish && (
        <Container
          style={{
            textAlign: "center",
            position: "absolute",
            top: `calc(50% - ${theme.spacing(2)}px)`,
            left: 0,
            transform: "translateY(-50%)",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            style={{
              color: theme.palette.success.main,
              marginBottom: theme.spacing(2),
            }}
          >
            Hoàn thành thử thách ...
          </Typography>
          <Typography
            variant="h4"
            style={{ color: theme.palette.success.main }}
          >
            Hít thật sâu và tiến đến thử cách cuối cùng nào
          </Typography>
        </Container>
      )}
    </section>
  );
}
