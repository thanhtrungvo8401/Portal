import React from "react";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import TitleItem from "components/atoms/title-item";
import DividerItem from "components/atoms/devider-item";
import GridGroupsItem from "components/molecules/grid-groups-items";
import ItemOutline from "components/atoms/item-outline";
import HearingIcon from '@material-ui/icons/Hearing';
import { Button, makeStyles, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { cssAnimationHelper } from "utils/AnimationHelper";
import { constantApp } from "utils/Constant";
import { getRandom, isMobile, randomList } from "utils/Helper";
import FollowCatBtn from "components/molecules/follow-cat-btn";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import { jpSpeak } from "utils/textToSpeech";


const useStyles = makeStyles(theme => ({
  root: {
    ...cssAnimationHelper('Q-and-A',
      {
        opacity: 0,
        transform: "translateX(-100%)",
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        transform: "translateX(0)",
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      false),
  }
}));

const TOTAL_ANSWER_OPTIONS = 8;
const LONG_STRING_LENGTH = isMobile ? 15 : 30;
export const QA_TYPE = {
  JP: "JP",
  MEANING: "MEANING",
  SOUND: "SOUND"
}

function RenderQuestion({ voca }) {
  switch (voca.type) {
    case QA_TYPE.JP:
      return <ItemOutline center={true} >
        <Typography variant="h6" color="textSecondary">
          {voca["voca"]}
        </Typography>
      </ItemOutline>
    case QA_TYPE.MEANING:
      return <ItemOutline center={true}>
        <Typography variant="h6" color="textSecondary">
          {voca["meaning"]}
        </Typography>
      </ItemOutline>
    case QA_TYPE.SOUND:
      return <ItemOutline center={true}>
        <HearingIcon color="primary" style={{ fontSize: '2rem' }} />
      </ItemOutline>
    default:
      return null;
  }
}

const renderTitleQA = (voca) => {
  switch (voca.type) {
    case QA_TYPE.JP:
      return { exercise: "Đọc từ vựng tiếng Nhật", answer: "Chọn nghĩa tiếng Việt" }
    case QA_TYPE.MEANING:
      return { exercise: "Đọc nghĩa tiếng Việt", answer: "Chọn từ vựng tiếng Nhật" }
    case QA_TYPE.SOUND:
      return { exercise: "Nghe từ vựng tiếng Nhật", answer: "Chọn nghĩa tiếng Việt" }
    default:
      return {};
  }
}

export default function Testing({ study, onFinishTesting }) {
  const classes = useStyles();
  const [QandA, setQandA] = React.useState({});
  const [listQAndA, setListQAndA] = React.useState([]);
  const [answerOptions, setAnswerOptions] = React.useState([]);
  const [position, setPosition] = React.useState(-1);
  const [readyForTesting, setReadyForTesting] = React.useState({ isIn: false, ready: false })

  const generateNewQAndA = () => {
    if (position !== listQAndA.length - 1) {
      const nextQandA = listQAndA[position + 1];
      // generate answer-options from randVocas of study:
      const key = (nextQandA.type === QA_TYPE.MEANING) ? "voca" : "meaning";
      const answerSet = new Set();
      answerSet.add(nextQandA[key]);
      while (answerSet.size < TOTAL_ANSWER_OPTIONS) {
        const randIn = getRandom(0, study.randVocas.length - 1);
        if (study.randVocas[randIn][key] !== nextQandA[key]) {
          answerSet.add(study.randVocas[randIn][key]);
        }
      }
      // ---
      setQandA({ ...nextQandA, isIn: true, result: '' });
      setAnswerOptions(Array.from(answerSet).sort((a, b) => b.length - a.length));
      setPosition(position + 1);
    } else {
      onFinishTesting && onFinishTesting();
    }
  }
  const afterRenderNewQA = () => {
    if (QandA.type === QA_TYPE.SOUND) jpSpeak({ content: QandA.voca }).then().catch(err => log(err));
  }
  const selectAnswer = (value) => {
    setQandA({ ...QandA, result: value })
  }
  const finishAnswerOneQA = () => {
    const newList = [...listQAndA];
    newList[position] = QandA;
    setListQAndA(newList);
    generateNewQAndA();
  }

  // 00: generate list Q&A:
  React.useEffect(() => {
    const list1 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.JP, isExact: false, time: 0 }));
    const list2 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.MEANING, isExact: false, time: 0 }));
    const list3 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.SOUND, isExact: false, time: 0 }));
    const listQAndA_Random = randomList([...list1, ...list2, ...list3]);
    setListQAndA(listQAndA_Random);
    setReadyForTesting({ ...readyForTesting, isIn: true })
  }, []);

  return <section className={classes.root} >
    <BodyTop>
      <TitleBody>Bài kiểm tra cuối buổi học</TitleBody>
      <BodyMaxWidth>
        <div className={classes.root} hidden={!readyForTesting.ready} >
          <TitleItem>{renderTitleQA(QandA).exercise}</TitleItem>
          <CSSTransition
            classNames="Q-and-A" in={QandA.isIn}
            onEntered={afterRenderNewQA}
            onExited={finishAnswerOneQA}
            timeout={constantApp.animationDuration}
          >
            <RenderQuestion voca={QandA} />
          </CSSTransition>

          <DividerItem />

          <TitleItem>{renderTitleQA(QandA).answer}</TitleItem>
          <GridGroupsItem
            items={
              answerOptions.map((option, index) => ({
                el: <ItemOutline
                  center={true}
                  styles={{ cursor: "pointer" }}
                  isActive={option === QandA.result}
                  onClick={() => selectAnswer(option)}
                >
                  {option}
                </ItemOutline>,
                isLarge: option.length >= LONG_STRING_LENGTH
              }))
            }
          />

          <DividerItem />

          <ActionsBtnGroup center >
            <Button color="primary" variant="contained" disabled={!QandA.result} onClick={() => setQandA({ ...QandA, isIn: false })}>
              Tiếp theo
            </Button>
          </ActionsBtnGroup>

        </div>
        <FollowCatBtn
          hidden={readyForTesting.ready}
          isIn={readyForTesting.isIn}
          onExited={() => { setReadyForTesting({ ...readyForTesting, ready: true }); generateNewQAndA(); }}
          onClick={() => { setReadyForTesting({ ...readyForTesting, isIn: false }) }}
          description="Tôi đã sẵn sàng"
        />
      </BodyMaxWidth>
    </BodyTop>
  </section>
}
