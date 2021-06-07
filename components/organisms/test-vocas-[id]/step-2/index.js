import React from "react";
import Instruction_Step2 from "components/organisms/test-vocas-[id]/step-2/instruction";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import DividerItem from "components/atoms/devider-item";
import HorizontalMoveCover from "components/molecules/horizontal-move-cover";

export default function TestGroupStep2({ }) {
  const [isActive, setIsActive] = React.useState(true);
  return <React.Fragment>
    <Instruction_Step2 />
    <BodyTop>
      <TitleBody>Nghe cách đọc chọn nghĩa tiếng việt</TitleBody>
      <DividerItem />

      <HorizontalMoveCover isActive={isActive} >
        <h1>HelloWorld</h1>
      </HorizontalMoveCover>

      <button onClick={() => setIsActive(!isActive)} >
        Reverse
      </button>
    </BodyTop>
  </React.Fragment>
}