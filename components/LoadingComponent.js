import { CircularProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
const useStyle = makeStyles((theme) => {
  return {
    loadingComponent: {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    bgComponent: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: theme.palette.info.main,
      opacity: 0.8,
      zIndex: 0,
    },
    circle: {
      position: "relative",
      zIndex: 1,
    },
  };
});

function LoadingComponent(props) {
  const classes = useStyle();
  const isLoading = useSelector((state) => state.isLoading);
  if (!isLoading) return null;
  return (
    <div className={classes.loadingComponent}>
      <div className={classes.bgComponent}></div>
      <CircularProgress thickness={4} />
    </div>
  );
}

export default LoadingComponent;
