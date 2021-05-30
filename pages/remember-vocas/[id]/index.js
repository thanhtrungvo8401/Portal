import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import StudyModal from "container/RememberVoca/StudyModal/StudyModal";
import { serviceGetRememberById } from "service/rememberService";
import { serviceGetVocasByCodes } from "service/vocaService";

function StudyRememberGroupById() {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const { rememberGroup } = useSelector((state) => state.rememberGroups);

  React.useEffect(() => {
    if (id) {
      dispatch(serviceGetRememberById(id));
    }
  }, [id]);

  React.useEffect(() => {
    if (rememberGroup && rememberGroup.vocaCodes) {
      dispatch(serviceGetVocasByCodes(rememberGroup.vocaCodes));
    }
  }, [rememberGroup && rememberGroup.vocaCodes]);

  return <StudyModal />;
}

export default withPrivateLayout(StudyRememberGroupById, {
  title: "Study room - Enjoy your study",
});
