import { ListItem, makeStyles } from "@material-ui/core";
import { constantApp } from "utils/Constant";
const useStyles = (center) => makeStyles(theme => ({
  root: {
    transition: `all ${constantApp.animationDuration}ms ease-in`,
    justifyContent: center ? "center" : "flex-start",
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.light}`,
    marginBottom: theme.spacing(1),
    overflow: "hidden",
    width: "100%",
    "&:hover": {
      boxShadow: constantApp.BOXSHADOW,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  }
}))
export default function ListItemOutline({ center, children, styles, onClick }) {
  const classes = useStyles(center)();
  return <ListItem
    style={styles}
    className={classes.root}
    onClick={() => onClick && onClick()}
  >
    {children}
  </ListItem>
}