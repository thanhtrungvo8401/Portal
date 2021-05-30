// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import TitlePage from "components/atoms/title-page";
import { BodyContainer } from "components/atoms/body-wrapper";
import MyVocasInstruction from "components/organisms/my-vocas/instruction";
import MyVocasBody from "components/organisms/my-vocas/body";
import React from "react";
// import {
//   serviceCreateSetVoca,
//   serviceDeleteSetVocas,
//   serviceGetSetVocas,
//   serviceUpdateSetVoca,
// } from "service/setVocaService";
// import { storageKey } from "utils/Constant";
// import { localStorageHelper } from "utils/storageHelper";
function MySetVocas(props) {

  // const handleOnSubmitModal = () => {
  //   if (!setVoca.id) {
  //     dispatch(serviceCreateSetVoca({ ...setVoca, authorId: user.id }));
  //   } else {
  //     dispatch(serviceUpdateSetVoca(setVoca));
  //   }
  // };

  // const handleOnRemoveSetVocaById = (setVocaId) => {
  //   dispatch(serviceDeleteSetVocas(setVocaId));
  // };
  return <React.Fragment>
    <TitlePage>Tạo nhóm từ vựng của riêng bạn</TitlePage>
    <BodyContainer>
      <MyVocasInstruction />
      <MyVocasBody />
    </BodyContainer>
  </React.Fragment>
}

export default withPrivateLayout(MySetVocas, {
  title: "Study Room - Create more vocabularies",
});
