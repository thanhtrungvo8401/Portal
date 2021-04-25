import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  step2Study: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    margin: "0 auto",
    zIndex: 0,
    position: "absolute",
    backgroundImage:
      "linear-gradient(to left top, #976fdf, #a88ae7, #bba5ef, #cec0f5, #e2dbfa, #e2dbfa, #e2dbfa, #e2dbfa, #cec0f5, #bba5ef, #a88ae7, #976fdf)",
  },
}));

export default function Step2Study({ study, hidden }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.step2Study}>
      Programming...
      {JSON.stringify(study)}
    </div>
  );
}
