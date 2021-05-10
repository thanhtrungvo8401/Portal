import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listeningAnimation: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    "& .pulse-ring": {
      position: "absolute",
      width: "calc(100%)",
      height: "calc(100%)",
      boxSizing: "border-box",
      zIndex: 0,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      // border: `2px solid ${theme.palette.error.main}`,
      backgroundColor: `${theme.palette.error.main}`,
      borderRadius: "50%",
      animation: "$pulsate-animation infinite 1s",
      opacity: 0.8,
      transformOrigin: "center",
    },
  },
  "@keyframes pulsate-animation": {
    "0%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 0.6,
    },
    "100%": {
      transform: "translate(-50%, -50%) scale(1.2)",
      opacity: 0,
    },
  },
}));

export default function ListeningAnimation({ children, isActive }) {
  const classes = useStyles();
  return (
    <div className={classes.listeningAnimation}>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      {isActive && <div class="pulse-ring"></div>}
    </div>
  );
}
