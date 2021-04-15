import { Container } from "@material-ui/core";
import React, { useState } from "react";
import MultiTabStudy from "../../components/MultiTabStudy/MultiTabStudy";
import PageTitle from "../../components/PageComponent/PageTitle";
import { paramsHelper } from "../../utils/paramsHelper";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

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
      <Container>
        <MultiTabStudy activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab1 hidden={!(activeTab === 0)} />
        <Tab2 hidden={!(activeTab === 1)} />
        <Tab3 hidden={!(activeTab === 2)} />
      </Container>
    </React.Fragment>
  );
}
