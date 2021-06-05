import React from "react";
import Instruction_Step6 from "components/organisms/remember-vocas-[id]/step-6/instruction";
import Testing from "components/organisms/remember-vocas-[id]/step-6/testing";
import ResultTesting from "components/organisms/remember-vocas-[id]/step-6/result-testing";

export const QA_TYPE = {
  JP: "JP",
  MEANING: "MEANING",
  SOUND: "SOUND"
}
export const QUESTION_PER_VOCA = 3;
const getCompairField = type => {
  switch (type) {
    case QA_TYPE.JP:
      return "meaning";
    case QA_TYPE.MEANING:
      return "voca";
    case QA_TYPE.SOUND:
      return "meaning";
    default:
      return null;
  }
}

export default function Remember_Id_Step6({ study, actionChangeStep }) {
  const listVocas = [...study.vocas].sort((a, b) => a.id > b.id ? 1 : -1)
  const [isFinish, setIsFinish] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [time, setTime] = React.useState(0);
  const [exactNum, setExactNum] = React.useState(0);

  const handleFinishTesting = (values) => {
    setIsFinish(true);
    // sort values result base on id:
    // to we can sure that: 
    // the "values" (3n, 3n+1, 3n+2) the same id with "listVocas" (n);
    values.sort((a, b) => a.id > b.id ? 1 : -1);
    let _time = 0;
    let _exactNum = 0;
    const _results =
      listVocas
        .map(v => {
          // from {id, JP, ...}, {id, SOUND, ...}, {id, MEANING, ...}
          // => {id, voca, meaning, JP:_, SOUND: _, MEANING: _}
          const { id, voca, meaning } = v;
          const obj = { id, voca, meaning };

          for (let i = 0; i < QUESTION_PER_VOCA; i++) {
            const _voca = values[i];
            obj[_voca.type] = {
              result: _voca.result,
              isExact: _voca.result === obj[getCompairField(_voca.type)]
            };
            if (_voca.result === obj[getCompairField(_voca.type)]) {
              _exactNum += 1;
            }
            _time += _voca.time
          }
          values.splice(0, 3);
          return obj;
        })
    setResults(_results);
    setTime(_time);
    setExactNum(_exactNum);
  }
  const handleResetStep6 = () => {
    setIsFinish(false);
    setResults([]);
    setTime(0);
    setExactNum(0);
  }
  const handleGoToStep7 = () => {
    actionChangeStep(7);
  }
  return <React.Fragment>
    <Instruction_Step6 />
    {!isFinish && <Testing
      study={study}
      onFinishTesting={handleFinishTesting}
    />}
    {isFinish && <ResultTesting
      results={results}
      exactNum={exactNum}
      time={time}
      onTryAgain={handleResetStep6}
      onFinish={handleGoToStep7}
    />}
  </React.Fragment>
}