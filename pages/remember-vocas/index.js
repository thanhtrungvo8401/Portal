import React from "react";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import RememberVocasInstruction from "components/organisms/remember-vocas/instruction";
import RememberVocasBody from "components/organisms/remember-vocas/body";
import TitlePage from "components/atoms/title-page";
import { BodyContainer } from "components/atoms/body-wrapper";

function RememberVocas(props) {


  return (
    <React.Fragment>
      <TitlePage>Ghi nhớ từ vựng mới</TitlePage>
      <BodyContainer>
        <RememberVocasInstruction />
        <RememberVocasBody />
      </BodyContainer>
    </React.Fragment>
  );
}

export default withPrivateLayout(RememberVocas, {
  title: "Study Room - Remember all vocabularies now!",
});
