import React from "react";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import TitlePage from "components/atoms/title-page";
import { BodyContainer } from "components/atoms/body-wrapper";
import Remember_Id_Instruction from "components/organisms/remember-vocas-[id]/instruction";
function StudyRememberGroupById() {
  // const { id } = useRouter().query;
  // const dispatch = useDispatch();
  // const { rememberGroup } = useSelector((state) => state.rememberGroups);

  // React.useEffect(() => {
  //   if (id) {
  //     dispatch(serviceGetRememberById(id));
  //   }
  // }, [id]);

  // React.useEffect(() => {
  //   if (rememberGroup && rememberGroup.vocaCodes) {
  //     dispatch(serviceGetVocasByCodes(rememberGroup.vocaCodes));
  //   }
  // }, [rememberGroup && rememberGroup.vocaCodes]);

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
