import {
  List,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
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
import ListItemOutline from "components/atoms/list-item-outline";
import FollowCatBtn from "components/molecules/follow-cat-btn";

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
  const [listAnswered, setListAnswer] = React.useState([]);
  const [isFinish, setIsFinish] = React.useState(false);
  const [voca, setVoca] = React.useState({});
  const [selectMeaning, setSelectMeaning] = React.useState("");
  const [resultEmotion, setResultEmotion] = React.useState("");
  const [readyToGo, setReadyToGo] = React.useState({ isIn: false })
  const meaningOptions = React.useMemo(() => {
    return generateMeaningOptions(list, study.randVocas);
  }, [study.randVocas]);
  const nextQandA = () => {
    if (list.length > 0) {
      const random = getRandom(0, list.length - 1);
      const vocaQA = { ...list[random], isIn: true };
      if (voca.id) setListAnswer([...listAnswered, voca]);
      setVoca(vocaQA);
      setList(list.filter((v) => v.id !== vocaQA.id));
    } else {
      setListAnswer([...listAnswered, voca]);
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

  React.useEffect(() => {
    if (isFinish) setReadyToGo({ isIn: true })
  }, [isFinish]);

  return (
    <React.Fragment>
      <Instruction_Step4 />
      <BodyTop>
        <TitleBody>
          {!isFinish ? 'Tìm nghĩa chính xác cho từ' : 'Hãy nhìn lại những từ bạn đã trả lời đúng'}
        </TitleBody>
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

            <DeviderItem />
            <TitleItem hidden={isEmptyArr(listAnswered)} >
              {!isFinish ? 'Những câu trả lời đúng' : 'Click vào từ để nghe lại cách đoc'}
            </TitleItem>
            <List>
              {listAnswered
                .map((voca) => {
                  return (
                    <ListItemOutline
                      key={voca.id}
                      onClick={() => jpSpeak({ content: voca.voca })}
                      styles={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "lighter" }}
                        color="textSecondary"
                      >
                        {voca.voca}
                      </Typography>
                      <Typography
                        style={{ textTransform: "none" }}
                        variant="subtitle1"
                        color="textSecondary"
                      >
                        {voca.meaning}
                      </Typography>
                    </ListItemOutline>
                  );
                })}
            </List>
          </section>
        </BodyMaxWidth>

        <FollowCatBtn
          hidden={!isFinish}
          isIn={readyToGo.isIn}
          onExited={() => { actionChangeStep(5) }}
          onClick={() => { setReadyToGo({ isIn: false }) }}
          description="Qua bước kế tiếp"
        />
      </BodyTop>
    </React.Fragment >
  );
}
