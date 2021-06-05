import React from "react";
import Instruction_Step6 from "components/organisms/remember-vocas-[id]/step-6/instruction";
import Testing from "components/organisms/remember-vocas-[id]/step-6/testing";
import ResultTesting from "components/organisms/remember-vocas-[id]/step-6/result-testing";


export default function Remember_Id_Step6({ study, actionChangeStep }) {
  const [isFinish, setIsFinish] = React.useState(true);
  const [results, setResults] = React.useState([
    {
      id: "873f3ccb-dde2-4488-9470-bdefdc9b0d46",
      isExact: false,
      isIn: false,
      meaning: "Nhặt lượm",
      note: "ひろいます",
      result: "拾います",
      sentence: "",
      time: 5459,
      type: "MEANING",
      voca: "拾います",
    }, {
      id: "873f3ccb-dde2-4488-9470-bdefdc9b0d46",
      isExact: false,
      isIn: false,
      meaning: "Nhặt lượm",
      note: "ひろいます",
      result: "拾います",
      sentence: "",
      time: 5459,
      type: "SOUND",
      voca: "拾います",
    }, {
      id: "873f3ccb-dde2-4488-9470-bdefdc9b0d46",
      isExact: false,
      isIn: false,
      meaning: "Nhặt lượm",
      note: "ひろいます",
      result: "拾います",
      sentence: "",
      time: 5459,
      type: "JP",
      voca: "拾います",
    }
  ]);

  const handleFinishTesting = (values) => {
    setIsFinish(true);
    setResults(values);
  }
  return <React.Fragment>
    <Instruction_Step6 />
    {!isFinish && <Testing study={study} onFinishTesting={handleFinishTesting} />}
    {isFinish && <ResultTesting results={results} />}
  </React.Fragment>
}