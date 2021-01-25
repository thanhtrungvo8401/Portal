import { CircularProgress, makeStyles } from "@material-ui/core";
const useStyle = makeStyles((theme) => {
  return {
    loadingComponent: {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: theme.palette.secondary.main,
      zIndex: 999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

function LoadingComponent(props) {
  const classes = useStyle();
  return (
    <div className={classes.loadingComponent}>
      <CircularProgress thickness={4} />
    </div>
  );
}

export default LoadingComponent;
