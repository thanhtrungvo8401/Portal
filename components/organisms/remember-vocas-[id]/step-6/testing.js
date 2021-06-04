import React from "react";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import TitleItem from "components/atoms/title-item";
import DividerItem from "components/atoms/devider-item";
import { makeStyles, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { cssAnimationHelper } from "utils/AnimationHelper";
import { constantApp } from "utils/Constant";
import { randomList } from "utils/Helper";

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
export const QA_TYPE = {
  JP: "JP",
  MEANING: "MEANING",
  SOUND: "SOUND"
}

export default function Testing({ study, onFinishTesting }) {
  const classes = useStyles();
  const [QandA, setQandA] = React.useState({});
  const [listQAndA, setListQAndA] = React.useState([]);
  const [answerOptions, setAnswerOptions] = React.useState([]);
  const [position, setPosition] = React.useState(-1);

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
      setQandA({ ...nextQandA, isIn: true });
      setAnswerOptions(Array.from(answerSet).sort());
      setPosition(position + 1);
    } else {
      onFinishTesting && onFinishTesting();
    }
  }
  const startQAndA = () => { }
  const finishAndSaveQAndAResult = () => { }

  // 00: generate list Q&A:
  React.useEffect(() => {
    const list1 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.JP, isExact: false, time: 0 }));
    const list2 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.MEANING, isExact: false, time: 0 }));
    const list3 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.SOUND, isExact: false, time: 0 }));
    const listQAndA_Random = randomList([...list1, ...list2, ...list3]);
    setListQAndA(listQAndA_Random);
  }, []);

  return <section className={classes.root} >
    <BodyTop>
      <TitleBody>Bước cuối: Tổng kiểm tra</TitleBody>
      <BodyMaxWidth>
        <TitleItem>Đề bài</TitleItem>
        <CSSTransition
          classNames="Q-and-A" in={QandA.isIn}
          onEntered={startQAndA}
          onExited={finishAndSaveQAndAResult}
          timeout={constantApp.animationDuration}
        >
          <RenderQuestion voca={QandA} />
        </CSSTransition>

        <DividerItem />

        <TitleItem>Chọn đáp án</TitleItem>
        {/* Render Options */}
      </BodyMaxWidth>
    </BodyTop>
  </section>
}

function RenderQuestion({ voca }) {
  switch (QAndA.type) {
    case QA_TYPE.JP:
      return <Typography variant="h6" color="primary">
        {voca["voca"]}
      </Typography>
    case QA_TYPE.MEANING:
      return <Typography variant="h6" color="textSecondary">
        {voca["meaning"]}
      </Typography>
    case QA_TYPE.SOUND:
      return <Typography variant="h6" color="textSecondary">
        Lắng nghe đề bài <HearingIcon color="primary" />
      </Typography>
    default:
      return null;
  }
}
