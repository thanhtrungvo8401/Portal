import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import React, { useEffect, useRef, useState } from "react";
import { isServer } from "../../utils/Helper";

const useStyles = makeStyles((theme) => ({}));

const listTabItem = [
  { Icon: MenuBookIcon, label: "Nhớ từ" },
  { Icon: FiberNewIcon, label: "Tạo thêm từ" },
  { Icon: CastForEducationIcon, label: "Kiểm tra kiến thức" },
];

export default function MultiTabStudy() {
  // const classes = useStyles();
  const [isDestop, setIsDesktop] = useState(
    !isServer && window.innerWidth > 600
  );
  const getCurrentActiveTab = () => {
    const location = window.location.pathname;
    console.log(location);
  };
  useEffect(() => {
    getCurrentActiveTab();
    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) {
        setIsDesktop(false);
      }
      if (window.innerWidth > 600) {
        setIsDesktop(true);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <Paper elevation={0}>
        <Tabs
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
          value={1}
        >
          {listTabItem.map(({ Icon, label }, index) => {
            return (
              <Tab key={index} label={isDestop ? label : ""} icon={<Icon />} />
            );
          })}
        </Tabs>
      </Paper>
    </React.Fragment>
  );
}
