import { makeStyles } from "@material-ui/core"

const useStyles = (center) => makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: center ? "center" : "flex-end"
  }
}))

export default function ActionsBtnGroup({ children, center }) {
  const classes = useStyles(center)();
  return <div className={classes.root} >
    {children}
  </div>
}