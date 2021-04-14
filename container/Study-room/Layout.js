import React, { useState } from "react";
import MultiTabStudy from "../../components/MultiTabStudy/MultiTabStudy";
import PageTitle from "../../components/PageComponent/PageTitle";
import { paramsHelper } from "../../utils/paramsHelper";

const ACTIVE_TAB = "activeTab";

export default function StudyRoomLayout(props) {
  const [activeTab, setTab] = useState(
    paramsHelper.get(ACTIVE_TAB) != null
      ? Number(paramsHelper.get(ACTIVE_TAB))
      : 0
  );
  const setActiveTab = (tab) => {
    paramsHelper.set(ACTIVE_TAB, tab);
    setTab(tab);
  };
  return (
    <React.Fragment>
      <PageTitle>My Study Room</PageTitle>
      <MultiTabStudy activeTab={activeTab} setActiveTab={setActiveTab} />
    </React.Fragment>
  );
}
