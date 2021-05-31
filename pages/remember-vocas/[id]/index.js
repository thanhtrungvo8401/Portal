import React from "react";
import { useRouter } from "next/router";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import { BodyContainer } from "components/atoms/body-wrapper";
import TitlePage from "components/atoms/title-page";
import Remember_Id_Instruction from "components/organisms/remember-vocas-[id]/instruction";
import { serviceGetRememberById } from "service/rememberService";
import { serviceGetVocasByCodes } from "service/vocaService";
import { useDispatch, useSelector } from "react-redux";

function StudyRememberGroupById() {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const { rememberGroup } = useSelector((state) => state.rememberGroups);
  // Get current remember-group-by-id:
  React.useEffect(() => {
    if (id) dispatch(serviceGetRememberById(id));
  }, [id]);
  // handle get vocabulary base on this remember-group:
  React.useEffect(() => {
    const isValidData = rememberGroup && rememberGroup.vocaCodes;
    if (isValidData) dispatch(serviceGetVocasByCodes(rememberGroup.vocaCodes));
  }, [rememberGroup && rememberGroup.vocaCodes]);

  return <React.Fragment>
    <TitlePage>Cố gắng nhớ tất cả từ vựng bên dưới</TitlePage>
    <BodyContainer>
      <Remember_Id_Instruction />
    </BodyContainer>
  </React.Fragment>
}

export default withPrivateLayout(StudyRememberGroupById, {
  title: "Study room - Enjoy your study",
});
