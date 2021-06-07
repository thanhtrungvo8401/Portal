import React from "react";
import { BodyContainer } from "components/atoms/body-wrapper";
import { withPrivateLayout } from "components/templates/main";
import TitlePage from "components/atoms/title-page";
import TestVocasInstruction from "components/organisms/test-vocas/instruction";
import TestVocasBody from "components/organisms/test-vocas/body";
import TestVocaModal from "components/organisms/test-vocas/update-modal";

function TestVocas(props) {
  return <React.Fragment>
    <TitlePage>Tạo nhóm từ vựng của riêng bạn</TitlePage>
    <BodyContainer>
      <TestVocasInstruction />
      <TestVocasBody />
    </BodyContainer>
    <TestVocaModal />
  </React.Fragment>
}

export default withPrivateLayout(TestVocas, {
  title: "Study Room - Testing and Result!",
});
