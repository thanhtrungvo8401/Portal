import React from "react";
import { useRouter } from "next/router";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import { BodyContainer } from "components/atoms/body-wrapper";
import TitlePage from "components/atoms/title-page";
import Remember_Id_Step1 from "components/organisms/remember-vocas-[id]/step-1";
import Remember_Id_Step2 from "components/organisms/remember-vocas-[id]/step-2";
import Remember_Id_Step3 from "components/organisms/remember-vocas-[id]/step-3";
import Remember_Id_Step4 from "components/organisms/remember-vocas-[id]/step-4";
import ChangeStepBg from "components/atoms/change-step-bg";
import { serviceGetRememberById } from "service/rememberService";
import { serviceFetVocaRandomByLevel, serviceGetVocasByCodes } from "service/vocaService";
import { useDispatch, useSelector } from "react-redux";
import { localStorageHelper } from "utils/storageHelper";
import { storageKey } from "utils/Constant";

const initState = {
  vocas: [],
  randVocas: [],
  inActiveVocas: [],
  step: 0
}

function StudyRememberGroup_Id() {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const { rememberGroup } = useSelector((state) => state.rememberGroups);
  const { list } = useSelector(state => state.vocas);
  const [study, setStudy] = React.useState({ ...initState });
  const [bgStep, setBgStep] = React.useState(0);

  // Get RandVocas for study:
  React.useEffect(() => {
    const level = localStorageHelper.get(storageKey.MY_JP_LEVEL) || "N4";
    serviceFetVocaRandomByLevel(level)
      .then((randVocas) =>
        setStudy({
          ...study,
          randVocas,
        })
      )
      .catch((err) => {
        handleErrorAPI(err, "toast");
      });
  }, []);
  // 01: Get current remember-group-by-id:
  React.useEffect(() => {
    if (id) dispatch(serviceGetRememberById(id));
  }, [id]);
  // 02: after get remember-group => get-vocas-by-vocas-code:
  React.useEffect(() => {
    const isValidData = rememberGroup && rememberGroup.vocaCodes;
    if (isValidData) dispatch(serviceGetVocasByCodes(rememberGroup.vocaCodes));
  }, [rememberGroup && rememberGroup.vocaCodes]);
  // 03: set step=1 when vocas was fetched:
  React.useEffect(() => {
    if (list.length) setStudy({ ...study, step: 1, vocas: list })
  }, [list]);

  return <React.Fragment>
    <TitlePage>Meomeo-kun sẽ giúp bạn nhớ tất cả từ vựng bên dưới</TitlePage>
    <BodyContainer>
      {study.step === 1 &&
        <Remember_Id_Step1
          study={study}
          actionUpdate={setStudy}
          actionChangeStep={setBgStep}
        />
      }

      {study.step === 2 &&
        <Remember_Id_Step2
          study={study}
          actionChangeStep={setBgStep}
        />
      }

      {study.step === 3 &&
        <Remember_Id_Step3
          study={study}
          actionChangeStep={setBgStep}
        />
      }

      {study.step === 4 &&
        <Remember_Id_Step4
          study={study}
          actionChangeStep={setBgStep}
        />
      }

    </BodyContainer>
    {/* BG Change Step */}
    <ChangeStepBg
      step={bgStep}
      actionChangeStep={(step) => setStudy({ ...study, step })}
      reset={() => setBgStep(0)}
    />
  </React.Fragment>
}

export default withPrivateLayout(StudyRememberGroup_Id, {
  title: "Study room - Enjoy your study",
});
