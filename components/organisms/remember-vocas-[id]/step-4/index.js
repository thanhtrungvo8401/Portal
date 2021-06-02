import {
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import theme from "components/theme";
import { VOCA_RANDOM_LIMIT } from "utils/Constant";
import { cssAnimationHelper } from "utils/AnimationHelper";
import { getRandom } from "utils/Helper";
import { jpSpeak } from "utils/textToSpeech";
import { constantApp } from "utils/Constant";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Instruction_Step4 from "components/organisms/remember-vocas-[id]/step-4/instruction";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import ItemOutline from "components/atoms/item-outline";

const generateMeaningOptions = (listStudy, listRandom) => {
  if (listRandom.length !== VOCA_RANDOM_LIMIT) return [];
  const list = [...listStudy, ...listRandom];
  const results = new Set();
  while (list.length > 0) {
    const rand = getRandom(0, list.length - 1);
    results.add(list[rand].meaning);
    list.splice(rand, 1);
  }
  return Array.from(results);
};
const RESULT_EMOTION = { TRUE: "TRUE", FALSE: "FALSE" };
const { animationDuration } = constantApp

// MAIN UI
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // Q-A-voca ENTER
    ...cssAnimationHelper('Q-A-voca',
      {
        opacity: 0,
        transform: "translateX(-100%)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        transform: "translateX(0)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      false),
    // result-emotion ENTER:
    "& .result-emotion": {
      opacity: 0,
    },
    "& .result-emotion-enter": {
      opacity: 0,
    },
    "& .result-emotion-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .result-emotion-enter-done": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .result-emotion-exit": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "& .result-emotion-exit-active": {
      opacity: 0,
      transform: "translateY(50px)",
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .result-emotion-exit-done": {
      opacity: 0,
      transform: "translateY(50px)",
      transition: `all ${animationDuration}ms ease-in`,
    },
    // FINISH STEP
    "& .finish-step": {
      position: "relative",
      top: "100vh",
      left: 0,
      opacity: 0,
    },
    "& .finish-step-enter": {
      opacity: 0,
      top: "100vh",
    },
    "& .finish-step-enter-active": {
      opacity: 1,
      top: "0",
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .finish-step-enter-done": {
      opacity: 1,
      top: "0",
      left: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
  },
}));

export default function Remember_Id_Step4({ study, actionChangeStep }) {
  const classes = useStyles();
  const [isFinish, setIsFinish] = React.useState(false);
  const [list, setList] = React.useState([...study.vocas]);
  const timeCoutDown = 1 * [...study.vocas].length;
  const [countDown, setCountDown] = React.useState(timeCoutDown);
  const [listAnswered, setListAnswered] = React.useState([]);
  const [voca, setVoca] = React.useState({});
  const [selectMeaning, setSelectMeaning] = React.useState("");
  const [resultEmotion, setResultEmotion] = React.useState("");
  const meaningOptions = React.useMemo(() => {
    return generateMeaningOptions(list, study.randVocas);
  }, [study.randVocas]);
  const nextQandA = () => {
    if (list.length > 0) {
      const random = getRandom(0, list.length - 1);
      const vocaQA = { ...list[random], isIn: true };
      setVoca(vocaQA);
      setListAnswered([...listAnswered, vocaQA]);
      setList(list.filter((v) => v.id !== vocaQA.id));
    } else {
      setIsFinish(true);
    }
  };
  // 01: Start step 4
  React.useEffect(() => {
    nextQandA();
  }, []);
  // Check meaning right-after user select the answer:
  React.useEffect(() => {
    if (selectMeaning) {
      if (selectMeaning.toLowerCase() === voca.meaning.toLowerCase()) {
        setResultEmotion(RESULT_EMOTION.TRUE);
      } else {
        setResultEmotion(RESULT_EMOTION.FALSE);
      }
    }
  }, [selectMeaning]);
  // Count-down function use for review-voca-bularies
  React.useEffect(() => {
    if (isFinish && countDown > 0) {
      setTimeout(() => setCountDown(countDown - 0.1), 100);
    } else if (isFinish) {
      actionChangeStep(5);
    }
  }, [isFinish, countDown]);
  return (
    <React.Fragment>
      <Instruction_Step4 />
      <BodyTop>
        <TitleBody>Tìm nghĩa chính xác cho từ</TitleBody>
        <BodyMaxWidth>
          <section className={`${classes.root}`}>
            <div hidden={isFinish} >
              {/* Voca*/}
              <CSSTransition
                classNames="Q-A-voca"
                in={voca.isIn}
                timeout={animationDuration}
                onEntering={() => jpSpeak({ content: voca.voca })}
                onExited={() => nextQandA()}
              >
                <ItemOutline>
                  <Typography style={{ textAlign: "center", width: "100%" }} variant="h5" color="primary" component="label">
                    {voca.voca}
                  </Typography>
                  <Typography style={{ textAlign: "center", width: "100%" }} variant="caption" color="textSecondary" component="label">
                    {voca.note}
                  </Typography>
                </ItemOutline>
              </CSSTransition>
              {/* Select result */}
              <Autocomplete
                style={{ marginTop: theme.spacing(2) }}
                id="select-result"
                freeSolo
                options={meaningOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nghĩa của từ"
                    margin="normal"
                    variant="outlined"
                  />
                )}
                onChange={(e, value, reason) => setSelectMeaning(value)}
                value={selectMeaning}
              />
              {/* Show Result */}
              <CSSTransition
                timeout={animationDuration}
                classNames="result-emotion"
                in={resultEmotion === RESULT_EMOTION.TRUE}
                onEntered={() => {
                  setTimeout(() => {
                    setResultEmotion("");
                    setSelectMeaning("");
                    setVoca({ ...voca, isIn: false });
                  }, 2 * animationDuration);
                }}
              >
                <div
                  style={{ textAlign: "center", position: "absolute", width: "100%", left: 0, top: `calc(100% + 32px)` }}
                  className="result-emotion"
                >
                  <InsertEmoticonIcon
                    style={{
                      color: theme.palette.success.main,
                      fontSize: "5rem",
                    }}
                  />
                  <Typography
                    variant="h6"
                    style={{ color: theme.palette.success.main }}
                  >
                    Đúng rồi !!!
              </Typography>
                </div>
              </CSSTransition>
              <CSSTransition
                timeout={animationDuration}
                classNames="result-emotion"
                in={resultEmotion === RESULT_EMOTION.FALSE}
                onEntered={() => {
                  setTimeout(() => {
                    setResultEmotion("");
                    setSelectMeaning("");
                  }, 2 * animationDuration);
                }}
              >
                <div
                  style={{ textAlign: "center", position: "absolute", width: "100%", left: 0, top: `calc(100% + 32px)` }}
                  className="result-emotion"
                >
                  <SentimentVeryDissatisfiedIcon
                    style={{ color: theme.palette.error.main, fontSize: "5rem" }}
                  />
                  <Typography
                    variant="h6"
                    style={{ color: theme.palette.error.main }}
                  >
                    Thử lại xem nào !!!
              </Typography>
                </div>
              </CSSTransition>
            </div>
            <CSSTransition
              in={isFinish}
              classNames="finish-step"
              timeout={animationDuration}
            >
              <Container className="finish-step">
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(4) }}
                >
                  Nhìn lại những từ vừa học
          </Typography>
                {listAnswered.map((voca) => {
                  return (
                    <Button
                      key={voca.id}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: 0,
                        marginBottom: theme.spacing(1),
                      }}
                      onClick={() => jpSpeak({ content: voca.voca })}
                    >
                      <Paper
                        style={{
                          padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "transparent",
                        }}
                        className={`review-voca`}
                        elevation={3}
                      >
                        <Typography
                          variant="h5"
                          style={{ fontWeight: "lighter" }}
                          color="primary"
                        >
                          {voca.voca}
                        </Typography>
                        <Typography
                          style={{ fontWeight: "lighter", textTransform: "none" }}
                          variant="body1"
                          color="textSecondary"
                        >
                          {voca.meaning}
                        </Typography>
                      </Paper>
                    </Button>
                  );
                })}
              </Container>
            </CSSTransition>
            <div hidden={!isFinish}
              style={{
                margin: `${theme.spacing(3)}px auto`,
                position: "relative",
                height: "3rem",
                width: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                variant="determinate"
                value={(1 - countDown / timeCoutDown) * 100}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0,
                }}
              />
              <Typography variant="caption" color="textSecondary">
                {Math.round((1 - countDown / timeCoutDown) * 100)}
              </Typography>
            </div>
          </section>
        </BodyMaxWidth>
      </BodyTop>
    </React.Fragment>
  );
}
