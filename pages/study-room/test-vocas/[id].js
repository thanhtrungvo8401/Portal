import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StudyBg from "../../../components/ChangeStepBg/StudyBg";
import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import TestGroupStep1 from "../../../container/RememberVoca/TestGroup/TestGroupStep1";
import { TestGroupStep2 } from "../../../container/RememberVoca/TestGroup/TestGroupStep2";
import { serviceGetVocasByTestGroup } from "../../../service/vocaService";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto"
  }
}))
const initTestObj = {
  step: 1,
}

function TestYourKnowLege(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { list } = useSelector(state => state.vocas);
  // const [result, setResult] = React.useState([]);
  const [testObj, setTestObj] = React.useState({ ...initTestObj });
  const [bgObj, setBgObj] = React.useState({ step: 0 });

  React.useEffect(() => {
    dispatch(serviceGetVocasByTestGroup());
  }, []);

  return <div className={classes.root} >
    {testObj.step === 1 && <TestGroupStep1 actionUpdateBg={setBgObj} />}
    {testObj.step === 2 && <TestGroupStep2 actionUpdateBg={setBgObj} />}

    <StudyBg
      bgObj={bgObj}
      valuesObj={testObj}
      actionUpdate={setTestObj}
      actionUpdateBg={setBgObj}
    />
  </div>
}

export default withPrivateLayout(TestYourKnowLege, {
  title: "Study Room - Checking you memories !!!",
});
