import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(to top, rgb(247 ,247 ,247, 1), rgb(247 ,247 ,247, 0), rgb(247 ,247 ,247, 0))`
  }
}))

export default function BgWhiteTransparent({ isActive }) {
  return isActive
    ? <div className={useStyles().root} ></div >
    : null;
}