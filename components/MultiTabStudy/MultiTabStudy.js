import { Paper, Tab, Tabs } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import React, { useEffect, useState } from "react";
import { appUrl } from "../../utils/APP_URL";
import { isServer, navigate } from "../../utils/Helper";

// const useStyles = makeStyles((theme) => ({}));

const listTabItem = [
  {
    Icon: ArrowBackIcon,
    label: "Quay lại phòng học",
    url: appUrl.studyRoom(),
  },
  { Icon: MenuBookIcon, label: "Nhớ từ", url: appUrl.rememberVoca() },
  { Icon: FiberNewIcon, label: "Tạo thêm từ", url: appUrl.myVoca() },
  {
    Icon: CastForEducationIcon,
    label: "Kiểm tra kiến thức",
    url: appUrl.testVoca(),
  },
];

export default function MultiTabStudy() {
  // const classes = useStyles();
  const [isDestop, setIsDesktop] = useState(
    !isServer && window.innerWidth > 600
  );
  const [activeTab, setActiveTab] = useState(0);
  const getCurrentActiveTab = () => {
    const tabUrl = window.location.pathname;
    const studyTabArray = [
      appUrl.studyRoom(),
      appUrl.rememberVoca(),
      appUrl.myVoca(),
      appUrl.testVoca(),
    ];
    setActiveTab(studyTabArray.indexOf(tabUrl));
  };
  const listenerResizeScreen = () => {
    if (window.innerWidth < 600) {
      setIsDesktop(false);
    }
    if (window.innerWidth > 600) {
      setIsDesktop(true);
    }
  };
  useEffect(() => {
    getCurrentActiveTab();
    window.addEventListener("resize", listenerResizeScreen);
  }, []);
  // console.log(activeTab === 0 && index === 0);
  return (
    <React.Fragment>
      <Paper elevation={0}>
        <Tabs
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
          value={activeTab}
        >
          {listTabItem.map(({ Icon, label, url }, index) => {
            return (
              <Tab
                key={index}
                label={isDestop ? label : ""}
                icon={<Icon />}
                hidden={true}
                style={{
                  display: activeTab === 0 && index === 0 ? "none" : "block",
                }}
                onClick={() => navigate(url)}
              />
            );
          })}
        </Tabs>
      </Paper>
    </React.Fragment>
  );
}
