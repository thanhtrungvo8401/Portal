import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "components/templates/main";
import TestGroupStep1 from "components/organisms/test-vocas-[id]/step-1";
import TestGroupStep2 from "components/organisms/test-vocas-[id]/step-2";
import TestGroupStep3 from "components/organisms/test-vocas-[id]/step-3";
import TestGroupStep4 from "components/organisms/test-vocas-[id]/step-4";
import ChangeStepBg from "components/atoms/change-step-bg";
import { serviceGetVocasByTestGroup } from "service/vocaService";
import { BodyContainer } from "components/atoms/body-wrapper";
import TitlePage from "components/atoms/title-page";
import { sortAscBaseOnId } from "utils/Helper";

const initTestObj = { step: 1 }
const KEY = {
  STEP2: "step_2",
  STEP3: "step_3",
  STEP4: "step_4"
}

function TestYourKnowLege(props) {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.vocas);
  const [results, setResults] = React.useState([]);
  const [testObj, setTestObj] = React.useState({ ...initTestObj });
  const [bgStep, setBgStep] = React.useState(0);

  const handleFinishStep2 = (values) => {
    const step2Results = values.sort(sortAscBaseOnId);
    const _results =
      [...list].sort(sortAscBaseOnId)
        .map((v, i) => {
          const _v = step2Results[i];
          return { ...v, [KEY.STEP2]: { value: _v.result, time: _v.time } }
        })
    setResults(_results);
    setBgStep(3);
  }

  const handleFinishStep3 = (values) => {
    const step3Results = values.sort(sortAscBaseOnId);
    const _results =
      results.map((v, i) => {
        const _v = step3Results[i];
        return { ...v, [KEY.STEP3]: { value: _v.result, time: _v.time } }
      })
    setResults(_results);
    setBgStep(4);
  }

  const handleFinishStep4 = (values) => {
    const step4Results = values.sort(sortAscBaseOnId);
    const _results =
      results.map((v, i) => {
        const _v = step4Results[i];
        return { ...v, [KEY.STEP4]: { value: _v.result, time: _v.time } }
      });
    setResults(_results);
    setBgStep(5);
  }

  React.useEffect(() => {
    dispatch(serviceGetVocasByTestGroup());
  }, []);

  React.useEffect(() => {
    if (results.length) console.log(results);
  }, [results])

  return <React.Fragment>
    <TitlePage>Kiểm tra kiến thức</TitlePage>
    <BodyContainer>
      {testObj.step === 1 &&
        <TestGroupStep1 actionChangeStep={setBgStep} />
      }
      {testObj.step === 2 &&
        <TestGroupStep2 onFinishStep2={handleFinishStep2} />
      }
      {testObj.step === 3 &&
        <TestGroupStep3 onFinishStep3={handleFinishStep3} />
      }
      {testObj.step === 4 &&
        <TestGroupStep4 onFinishStep4={handleFinishStep4} />
      }
    </BodyContainer>
    {/* BG Change Step */}
    <ChangeStepBg
      step={bgStep}
      actionChangeStep={(step) => setTestObj({ ...testObj, step })}
      reset={() => setBgStep(0)}
    />
  </React.Fragment>
}

export default withPrivateLayout(TestYourKnowLege, {
  title: "Study Room - Checking you memories !!!",
});
