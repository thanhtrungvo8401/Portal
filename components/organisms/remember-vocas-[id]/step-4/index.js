import {
  Button,
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
import { getRandom, isEmptyArr } from "utils/Helper";
import { jpSpeak } from "utils/textToSpeech";
import { constantApp } from "utils/Constant";
import Instruction_Step4 from "components/organisms/remember-vocas-[id]/step-4/instruction";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import CatAnnoucement from "components/molecules/cat-announcement";
import TitleBody from "components/atoms/title-body";
import TitleItem from "components/atoms/title-item";
import ItemOutline from "components/atoms/item-outline";
import DeviderItem from "components/atoms/devider-item";

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
  },
}));

export default function Remember_Id_Step4({ study, actionChangeStep }) {
  const classes = useStyles();
  const [list, setList] = React.useState([...study.vocas]);
  const [listAnswered, setListAnswered] = React.useState([]);
  const [listRightAnswered, setListRightAnswer] = React.useState([]);
  const [isFinish, setIsFinish] = React.useState(false);
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
      setListAnswered([...listAnswered, vocaQA]);
      if (voca.id) setListRightAnswer([...listRightAnswered, voca]);
      setVoca(vocaQA);
      setList(list.filter((v) => v.id !== vocaQA.id));
    } else {
      setListRightAnswer([...listRightAnswered, voca]);
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

  return (
    <React.Fragment>
      <Instruction_Step4 />
      <BodyTop>
        <TitleBody>Tìm nghĩa chính xác cho từ</TitleBody>
        <BodyMaxWidth>
          <section className={`${classes.root}`}>
            {!isFinish &&
              <React.Fragment>
                <TitleItem> Từ vựng</TitleItem>
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
                <DeviderItem />
                <TitleItem>Hãy nhập đáp án của bạn vào đây</TitleItem>
                <Autocomplete
                  id="select-result"
                  freeSolo
                  options={meaningOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nghĩa của từ"
                      margin="normal"
                      variant="outlined"
                      style={{ margin: 0 }}
                    />
                  )}
                  onChange={(e, value, reason) => setSelectMeaning(value)}
                  value={selectMeaning}
                />
              </React.Fragment>
            }

            <CatAnnoucement
              isActive={resultEmotion === RESULT_EMOTION.TRUE}
              type={1}
              onEntered={() => {
                setTimeout(() => {
                  setResultEmotion("");
                  setSelectMeaning("");
                  setVoca({ ...voca, isIn: false });
                }, 2 * animationDuration);
              }}
            />
            <CatAnnoucement
              isActive={resultEmotion === RESULT_EMOTION.FALSE}
              type={0}
              onEntered={() => {
                setTimeout(() => {
                  setResultEmotion("");
                  setSelectMeaning("");
                }, 2 * animationDuration);
              }}
            />

            <React.Fragment>
              <DeviderItem />
              <TitleItem hidden={isEmptyArr(listRightAnswered)} >
                Những câu trả lời đúng
              </TitleItem>
              {listRightAnswered
                .map((voca) => {
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
            </React.Fragment>
          </section>
        </BodyMaxWidth>
      </BodyTop>
    </React.Fragment >
  );
}
