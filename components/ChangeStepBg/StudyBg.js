import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../theme";
import styles from "./styles.module.css";
const useStyles = makeStyles((theme) => ({
  bgAnimation: {
    position: "fixed",
    left: 0,
    bottom: "120%",
    zIndex: 501,
    height: "120%",
    width: "100%",
    background: `linear-gradient(0deg, transparent 0%, #fff 30%, #fff 100%)`,
  },
}));

export default function StudyBg({
  valuesObj,
  bgObj,
  actionUpdateBg,
  actionUpdate,
}) {
  const classes = useStyles();
  const [animation, setAnimation] = React.useState("");
  React.useEffect(() => {
    if (bgObj.step !== 0 && !animation) {
      setAnimation("animation");

      setTimeout(() => {
        actionUpdate({ ...valuesObj, step: bgObj.step });
      }, 1000);

      setTimeout(() => {
        setAnimation("");
        actionUpdateBg({ step: 0 });
      }, 2000);
    }
  }, [bgObj.step]);

  return (
    <div
      style={{ padding: theme.spacing(2) }}
      className={`${classes.bgAnimation} ${
        animation ? styles["bgStudyAnimation"] : ""
      }`}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          position: "absolute",
          top: "40%",
          transform: "translate(-50%, -50%)",
          padding: "1rem",
          left: "50%",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h2"
          style={{ textAlign: "center", marginBottom: theme.spacing(4) }}
          color="primary"
        >
          MeoMeo-kun.com
        </Typography>
      </div>
    </div>
  );
}
