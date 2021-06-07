import React from "react";
import { useDispatch } from "react-redux";
import { withPrivateLayout } from "components/templates/main";
import TestGroupStep1 from "components/organisms/test-vocas-[id]/step-1";
import TestGroupStep2 from "components/organisms/test-vocas-[id]/step-2";
import ChangeStepBg from "components/atoms/change-step-bg";
import { serviceGetVocasByTestGroup } from "service/vocaService";
import { BodyContainer } from "components/atoms/body-wrapper";
import TitlePage from "components/atoms/title-page";

const initTestObj = { step: 1 }

function TestYourKnowLege(props) {
  const dispatch = useDispatch();
  const [testObj, setTestObj] = React.useState({ ...initTestObj });
  const [bgStep, setBgStep] = React.useState(0);

  React.useEffect(() => {
    dispatch(serviceGetVocasByTestGroup());
  }, []);

  return <React.Fragment>
    <TitlePage>Kiểm tra kiến thức</TitlePage>
    <BodyContainer>
      {testObj.step === 1 &&
        <TestGroupStep1 actionChangeStep={setBgStep} />
      }
      {testObj.step === 2 &&
        <TestGroupStep2 actionChangeStep={setBgStep} />
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
