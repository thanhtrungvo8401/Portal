import React from "react";
import TestGroupStep1 from "./TestGroupStep1";
import { TestGroupStep2 } from "./TestGroupStep2";

export const generalStyle = {
  width: "100%",
  maxWidth: 600,
  margin: "0 auto"
};
const initTestObj = {
  step: 1,
}

export default function TestGroupUI() {
  const [testObj, setTestObj] = React.useState({ ...initTestObj });
  return <div style={generalStyle} >
    {testObj.step === 1 && <TestGroupStep1 />}
    {testObj.step === 2 && <TestGroupStep2 />}
  </div>
}