import React from "react";
import Instruction_Step6 from "components/organisms/remember-vocas-[id]/step-6/instruction";
import Testing from "components/organisms/remember-vocas-[id]/step-6/testing";

export default function Remember_Id_Step6({ study }) {
  return <React.Fragment>
    <Instruction_Step6 />
    <Testing study={study} />
  </React.Fragment>
}