import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    padding: theme.spacing(2),
    left: 0,
    bottom: "120%",
    zIndex: 501,
    height: "120%",
    width: "100%",
    background: `linear-gradient(0deg, transparent 0%, #fff 30%, #fff 100%)`,
    "&.animation": {
      animation: "$bg-change-step-animation 2s"
    }
  },
  contentCover: {
    width: "100%",
    maxWidth: 600,
    position: "absolute",
    top: "40%",
    transform: "translate(-50%, -50%)",
    padding: "1rem",
    left: "50%",
    boxSizing: "border-box"
  },
  text: {
    textAlign: "center",
    marginBottom: theme.spacing(4)
  },
  '@keyframes bg-change-step-animation': {
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

export default function ChangeStepBg({ step, reset, actionChangeStep }) {
  const classes = useStyles();
  const [animation, setAnimation] = React.useState("");

  React.useEffect(() => {
    if (step !== 0 && !animation) {
      setAnimation("animation");

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
    <div className={`${classes.root} ${animation}`}>
      <div className={classes.contentCover} >
        <Typography variant="h2" color="primary" className={classes.text}>
          MeoMeo-kun.com
        </Typography>
      </div>
    </div>
  );
}
