import React from "react";
import Instruction_Step2 from "components/organisms/test-vocas-[id]/step-2/instruction";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
export default function TestGroupStep2({ }) {
  return <React.Fragment>
    <Instruction_Step2 />
    <BodyTop>
      <TitleBody>Nghe cách đọc chọn nghĩa tiếng việt</TitleBody>
    </BodyTop>
  </React.Fragment>
}