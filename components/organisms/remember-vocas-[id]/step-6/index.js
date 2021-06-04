import React from "react";
import Instruction_Step6 from "components/organisms/remember-vocas-[id]/step-6/instruction";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";


export default function Remember_Id_Step6({ }) {
  return <React.Fragment>
    <Instruction_Step6 />
    <BodyTop>
      <TitleBody>Bước cuối: Tổng kiểm tra</TitleBody>
    </BodyTop>
    <BodyMaxWidth>
      hello
    </BodyMaxWidth>
  </React.Fragment>
}