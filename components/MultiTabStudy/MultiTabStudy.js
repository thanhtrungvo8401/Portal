import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import React, { useEffect, useState } from "react";
import { appUrl } from "../../utils/APP_URL";
import { isServer } from "../../utils/Helper";

// const useStyles = makeStyles((theme) => ({}));

export const listTabItem = [
  { Icon: MenuBookIcon, label: "Nhớ từ" },
  { Icon: FiberNewIcon, label: "Tạo thêm từ" },
  {
    Icon: CastForEducationIcon,
    label: "Kiểm tra kiến thức",
    url: appUrl.testVoca(),
  },
];

export default function MultiTabStudy({ activeTab, setActiveTab }) {
  const [isDestop, setIsDesktop] = useState(
    !isServer && window.innerWidth > 600
  );
  const listenerResizeScreen = () => {
    if (window.innerWidth < 600) {
      setIsDesktop(false);
    }
    if (window.innerWidth > 600) {
      setIsDesktop(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", listenerResizeScreen);
  }, []);
  return (
    <React.Fragment>
      <Paper elevation={0}>
        <Tabs
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          value={activeTab}
        >
          {listTabItem.map(({ Icon, label }, index) => {
            return (
              <Tab
                key={index}
                label={isDestop ? label : ""}
                icon={<Icon />}
                hidden={true}
                onClick={() => setActiveTab(index)}
              />
            );
          })}
        </Tabs>
      </Paper>
    </React.Fragment>
  );
}
