import { makeStyles } from "@material-ui/core";
import React from "react";
import { getRandom } from "../../../utils/Helper";
import Step6StudyUI from "./Step6StudyUI";
import { bgStep_X_Study } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  Step6Study: bgStep_X_Study,
}));
export const QA_TYPE = {
  JP: "JP",
  MEANING: "MEANING",
  SOUND: "SOUND"
}
export default function Step6Study({ study }) {
  const classes = useStyles();
  const [listQAndA, setListQAndA] = React.useState([]);
  const [QandA, setQandA] = React.useState({});
  const [QandAOptionsList, setQandAOptionsList] = React.useState([]);
  const [position, setPosition] = React.useState(-1);
  const [isFinish, setIsFinish] = React.useState(false);
  // 00: Run onetime to generate list QandA from vocas:
  const generateListQandA = () => {
    const list1 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.JP, isExact: false, time: 0 }));
    const list2 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.MEANING, isExact: false, time: 0 }));
    const list3 = [...study.vocas].map(el => ({ ...el, type: QA_TYPE.SOUND, isExact: false, time: 0 }));
    const listQAndA_1 = list1.concat(list2, list3);
    const listQAndA_Random = [];

    while (listQAndA_1.length > 0) {
      const randIndex = getRandom(0, listQAndA_1.length - 1);
      listQAndA_Random.push(listQAndA_1[randIndex]);
      listQAndA_1.splice(randIndex, 1);
    }
    setListQAndA(listQAndA_Random);
  }
  // user click the right answer or timeup:
  // emit from UI:
  const submitQAndA_Answer = (answer) => {
    setQandA({});
    setQandAOptionsList([]);
    setListQAndA(listQAndA.map((el, i) => i === position ? answer : el));
  }
  // go to new Q and A:
  // emit from UI
  const getNewQAndA = () => {
    if (position === listQAndA.length - 1) {
      return setIsFinish(true);
    }
    const nextQandA = listQAndA[position + 1];
    // generate answer-options:
    const key = (nextQandA.type === QA_TYPE.MEANING)
      ? "voca"
      : "meaning";
    const answerSet = new Set();
    while (answerSet.size < 8) {
      const randIn = getRandom(0, study.randVocas.length - 1);
      if (study.randVocas[randIn][key] !== nextQandA[key]) {
        answerSet.add(study.randVocas[randIn][key]);
      }
    }
    const options = Array.from(answerSet);
    options[getRandom(0, options.length - 1)] = nextQandA[key];
    // ---
    setQandA(nextQandA);
    setQandAOptionsList(options);
    setPosition(position + 1);
  }
  // 00: generate list Q&A:
  React.useEffect(() => {
    if (study.vocas && study.vocas.length > 0) {
      generateListQandA();
    }
  }, [study.vocas]);
  // 01: when list Q&A was generated firsttime:
  React.useEffect(() => {
    if (listQAndA.length > 0) {
      getNewQAndA();
    }
  }, [listQAndA.length]);

  return (
    <div className={classes.Step6Study} >
      <Step6StudyUI
        QAndA={QandA}
        QandAOptions={QandAOptionsList}
        submitQAndA={submitQAndA_Answer}
        getNewQAndA={getNewQAndA}
        number={position}
        total={listQAndA.length}
        isFinish={isFinish}
        listQAndA={listQAndA}
      />
    </div>
  )
}
