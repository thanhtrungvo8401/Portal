import React from "react";
import Instruction_Step6 from "components/organisms/remember-vocas-[id]/step-6/instruction";
import Testing from "components/organisms/remember-vocas-[id]/step-6/testing";

export default function Remember_Id_Step6({ study, actionChangeStep }) {
  const [isFinish, setIsFinish] = React.useState(false);
  const [results, setResults] = React.useState([]);

  const handleFinishTesting = (values) => {
    setIsFinish(true);
    setResults(values);
  }
  return <React.Fragment>
    <Instruction_Step6 />
    {!isFinish && <Testing study={study} onFinishTesting={handleFinishTesting} />}
  </React.Fragment>
}