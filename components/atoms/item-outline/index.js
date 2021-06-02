import { makeStyles } from "@material-ui/core"
import { constantApp } from "utils/Constant";
const useStyles = (center) => makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: center ? "center" : "flex-start",
    boxSizing: "border-box",
    transition: `all ${constantApp.animationDuration}ms ease-in`,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.light}`,
    overflow: "hidden",
    width: "100%",
    "&:hover": {
      boxShadow: constantApp.BOXSHADOW,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  }
}))

export default function ItemOutline({ center, children, onClick }) {
  return <div
    className={useStyles(center)().root}
    onClick={() => onClick && onClick()}
  >
    {children}
  </div>
}