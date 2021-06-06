import { withPrivateLayout } from "components/templates/main";
import TitlePage from "components/atoms/title-page";
import { BodyContainer } from "components/atoms/body-wrapper";
import MyVocasInstruction from "components/organisms/my-vocas/instruction";
import MyVocasBody from "components/organisms/my-vocas/body";
import SetVocaModal from "components/organisms/my-vocas/create-update-modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { localStorageHelper } from "utils/storageHelper";
import { storageKey } from "utils/Constant";
import { serviceCreateSetVoca, serviceUpdateSetVoca } from "service/setVocaService";
function MySetVocas(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { setVoca } = useSelector((state) => state.setVocas);
  // api:
  const apiSubmitModal = () => {
    if (!setVoca.id) {
      dispatch(serviceCreateSetVoca({ ...setVoca, authorId: user.id }));
    } else {
      dispatch(serviceUpdateSetVoca(setVoca));
    }
  };
  return <React.Fragment>
    <TitlePage>Tạo nhóm từ vựng của riêng bạn</TitlePage>
    <BodyContainer>
      <MyVocasInstruction />
      <MyVocasBody />
      <SetVocaModal onSubmit={apiSubmitModal} />
    </BodyContainer>
  </React.Fragment>
}

export default withPrivateLayout(MySetVocas, {
  title: "Study Room - Create more vocabularies",
});
