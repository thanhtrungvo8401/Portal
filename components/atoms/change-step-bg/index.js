import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "components/theme";
const useStyles = makeStyles((theme) => ({
  bgAnimation: {
    position: "fixed",
    left: 0,
    bottom: "120%",
    zIndex: 501,
    height: "120%",
    width: "100%",
    background: `linear-gradient(0deg, transparent 0%, #fff 30%, #fff 100%)`,
    "&.bgStudyAnimation": {
      animation: "$bg-study-animation 2s"
    }
  },
  '@keyframes bg-study-animation': {
    '0%': {
      bottom: '120%'
    },
    '50%': {
      bottom: '-20%'
    },
    '100%': {
      bottom: '120%'
    }
  }
}));

export default function ChangeStepBg({
  step,
  reset,
  actionChangeStep,
}) {
  const classes = useStyles();
  const [animation, setAnimation] = React.useState("");
  React.useEffect(() => {
    if (step !== 0 && !animation) {
      setAnimation("bgStudyAnimation");

      setTimeout(() => {
        actionChangeStep(step);
      }, 1000);

      setTimeout(() => {
        setAnimation("");
        reset();
      }, 2000);
    }
  }, [step]);

  return (
    <div
      style={{ padding: theme.spacing(2) }}
      className={`${classes.bgAnimation} ${animation}`}
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
