import {
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import theme from "../../../components/theme";
import { VOCA_RANDOM_LIMIT } from "../../../utils/Constant";
import { getRandom } from "../../../utils/Helper";
import { animationDuration, styleStep_X_StudyUI } from "./StudyModal";
import { jpSpeak } from "../../../utils/textToSpeech";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

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
// MAIN UI
const useStyles = makeStyles((theme) => ({
  Step3StudyUI: styleStep_X_StudyUI,
  Step3Animation: {
    // Q-A-voca ENTER
    "& .Q-A-voca-enter": {
      opacity: 0,
      transform: "translateX(-100%)",
    },
    "& .Q-A-voca-enter-active": {
      opacity: 1,
      transform: "translateX(0)",
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .Q-A-voca-enter-done": {
      opacity: 1,
      transform: "translateX(0)",
      transition: `all ${animationDuration}ms ease-in`,
    },
    //Q-A-voca EXIT
    "& .Q-A-voca-exit": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "& .Q-A-voca-exit-active": {
      opacity: 0,
      transform: "translateX(100%)",
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .Q-A-voca-exit-done": {
      opacity: 0,
      transform: "translateX(100%)",
      transition: `all ${animationDuration}ms ease-in`,
    },
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
  },
}));

export default function Step3StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
  const [list, setList] = React.useState([...study.vocas]);
  const [listAnswer, setListAnswer] = React.useState([]);
  const [voca, setVoca] = React.useState({});
  const [selectMeaning, setSelectMeaning] = React.useState("");
  const [resultEmotion, setResultEmotion] = React.useState("");
  const vocasRandom = useSelector((state) => state.vocas.list);
  const meaningOptions = React.useMemo(() => {
    return generateMeaningOptions(list, vocasRandom);
  }, [vocasRandom]);
  const nextQandA = () => {
    if (list.length > 0) {
      const random = getRandom(0, list.length - 1);
      const vocaQA = { ...list[random], isIn: true };
      setVoca(vocaQA);
      setListAnswer([...listAnswer, vocaQA]);
      setList(list.filter((v) => v.id !== vocaQA.id));
    }
  };

  React.useEffect(() => {
    if (vocasRandom.length === VOCA_RANDOM_LIMIT) {
      nextQandA();
    }
  }, [vocasRandom]);
  React.useEffect(() => {
    if (selectMeaning) {
      if (selectMeaning == voca.meaning) {
        setResultEmotion(RESULT_EMOTION.TRUE);
      } else {
        setResultEmotion(RESULT_EMOTION.FALSE);
      }
    }
  }, [selectMeaning]);
  return (
    <section className={`${classes.Step3StudyUI} ${classes.Step3Animation}`}>
      <Container style={{ paddingTop: theme.spacing(1) }}>
        <Typography color="primary">Chọn nghĩa cho từ bên dưới</Typography>
        {/* Voca*/}
        <CSSTransition
          in={voca.isIn}
          timeout={animationDuration}
          onEntered={() => jpSpeak({ content: voca.voca })}
          onExited={() => nextQandA()}
        >
          <Paper
            className="Q-A-voca"
            elevation={3}
            style={{
              padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
              marginTop: theme.spacing(2),
              textAlign: "center",
            }}
          >
            <Typography
              style={{ textAlign: "center" }}
              variant="h5"
              color="primary"
            >
              {voca.voca}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {voca.note}
            </Typography>
          </Paper>
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
            style={{ textAlign: "center", marginTop: theme.spacing(6) }}
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
            style={{ textAlign: "center", marginTop: theme.spacing(6) }}
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
      </Container>
    </section>
  );
}
