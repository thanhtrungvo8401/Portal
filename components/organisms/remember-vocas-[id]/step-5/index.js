import React from "react";
import { Box, Button, ButtonGroup, Divider, IconButton, InputBase, makeStyles, Paper, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import MicNoneIcon from "@material-ui/icons/MicNone";
import CheckIcon from "@material-ui/icons/Check";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import { constantApp } from "utils/Constant";

import theme from "components/theme";
import { jpRecognition } from "utils/speechToText";
import { getRandom } from "utils/Helper";
import { jpConverter } from "utils/kanjiConverter";
import { jpSpeak } from "utils/textToSpeech";
import ListeningAnimation from "components/SpeakerAnimation/Listening";
import TypingGif from "components/SpeakerAnimation/TypingGif";

import Instruction_Step5 from "components/organisms/remember-vocas-[id]/step-5/instruction";
import ItemOutline from "components/atoms/item-outline";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import TitleItem from "components/atoms/title-item";
import DividerItem from "components/atoms/devider-item";

const CHECK_PRONOUCE = {
  TRUE: "TRUE",
  FALSE: "FALSE",
};
const { animationDuration } = constantApp;
const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "relative",
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
    MicroIcon: {
      textAlign: "center",
      "& .micro-icon": {
        width: "4rem",
        height: "4rem",
      },
      "& .micro-text": {
        position: "absolute",
        textAlign: "center",
        width: "200%",
        left: "50%",
        top: "100%",
        transform: "translate(-50%, -50%)",
        display: "block",
      }
    },
    ResultGroup: {
      textAlign: "center"
    }
  };
});

export default function Step5StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
  const [list, setList] = React.useState(
    study.vocas.map((el) => ({ ...el, count: 0 }))
  );
  // const [list, setList] = React.useState([...study.vocas]);
  // const [listAnswered, setListAnswered] = React.useState([]);
  // const [listRightAnswered, setListRightAnswer] = React.useState([]);
  
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
      if (randVoca.count < 1) { // so lan doc:
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
        actionUpdateBg({ step: 6 });
      }, animationDuration * 4);
    }
  }, [isFinish]);
  return (
    <React.Fragment>
      <Instruction_Step5 />
      <BodyTop>
        <TitleBody>Nhìn nghĩa tiếng việt phát âm từ</TitleBody>
        <BodyMaxWidth>
          <section className={classes.root}>
            {/* not finish group */}
            <div hidden={isFinish}>
              {/* Vietnamese Meaning */}
              {/* <CSSTransition classNames="Q-A-meaning" > */}
                <ItemOutline center={true} >
                  <Typography variant="h6" component="label" color="primary">
                    {voca.meaning}
                  </Typography>
                </ItemOutline>
              {/* </CSSTransition> */}
              {/* Micro Icon */}
              <DividerItem />
              <div className={classes.MicroIcon} >
                <IconButton onClick={startRecognition} style={{ position: "relative" }} disabled={Boolean(resultRecog)} >
                  <ListeningAnimation isActive={isListening}>
                    <MicNoneIcon style={{ color: `${isListening ? theme.palette.error.main : ""}` }} className="micro-icon" />
                  </ListeningAnimation>
                  <Typography color={isListening ? "error" : "textSecondary"} variant="caption" className="micro-text">
                    {isListening ? "Meomeo-kun đang lắng nghe..." : "Click to speak"}
                  </Typography>
                </IconButton>
              </div>
              {/* Result */}
              <DividerItem />
              <div className={classes.ResultGroup} >
                <TypingGif isActive={isSpeaking} size="1rem" jumpHeight="10px" spacing="5px" />
                <Typography hidden={!resultRecog} variant="h3" component="label" style={{ display: "block" }} color="textSecondary">
                  {resultRecog}
                </Typography>
                <Typography hidden={!resultConvert} variant="h6" component="label" style={{ display: "block" }} color="textSecondary">
                  {resultConvert}
                </Typography>
                <Typography hidden={!errorMsg} variant="h6" component="label" style={{ display: "block", fontWeight: "lighter" }} color="error" >
                  {errorMsg}
                </Typography>
              </div>
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
                    top: `calc(100% + 16px)`,
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
                    top: `calc(100% + 16px)`,
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
            </div>


            {isFinish && (
              <Typography>FINISH</Typography>
            )}
          </section>
        </BodyMaxWidth>
      </BodyTop>
    </React.Fragment>
  );
}
