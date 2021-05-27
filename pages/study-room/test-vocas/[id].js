import React from "react";
import { useDispatch } from "react-redux";
import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import TestGroupUI from "../../../container/RememberVoca/TestGroup/TestGroupUI";
import { serviceGetVocasByTestGroup } from "../../../service/vocaService";

function TestYourKnowLege(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(serviceGetVocasByTestGroup());
  }, []);
  return <TestGroupUI />
}

export default withPrivateLayout(TestYourKnowLege, {
  title: "Study Room - Checking you memories !!!",
});
