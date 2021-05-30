import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import TitlePage from "components/atoms/title-page";
import { BodyContainer } from "components/atoms/body-wrapper";
import MyVocasInstruction from "components/organisms/my-vocas/instruction";
import MyVocasBody from "components/organisms/my-vocas/body";
import React from "react";
function MySetVocas(props) {

  // const handleOnSubmitModal = () => {
  //   if (!setVoca.id) {
  //     dispatch(serviceCreateSetVoca({ ...setVoca, authorId: user.id }));
  //   } else {
  //     dispatch(serviceUpdateSetVoca(setVoca));
  //   }
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
