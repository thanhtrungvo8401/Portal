import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "components/templates/main";
import TestGroupStep1 from "components/organisms/test-vocas-[id]/step-1";
import { TestGroupStep2 } from "container/TestGroup/TestGroupStep2";
import ChangeStepBg from "components/atoms/change-step-bg";
import { serviceGetVocasByTestGroup } from "service/vocaService";
import { BodyContainer } from "components/atoms/body-wrapper";
import TitlePage from "components/atoms/title-page";

const initTestObj = { step: 1 }

function TestYourKnowLege(props) {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.vocas);
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
      step={bgStep} reset={() => setBgStep(0)}
      actionChangeStep={(step) => setTestObj({ ...testObj, step })}
    />
  </React.Fragment>
}

export default withPrivateLayout(TestYourKnowLege, {
  title: "Study Room - Checking you memories !!!",
});
