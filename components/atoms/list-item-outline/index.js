import { ListItem, makeStyles } from "@material-ui/core";
import { constantApp } from "utils/Constant";
const useStyles = makeStyles(theme => ({
  root: {
    transition: `all ${constantApp.animationDuration}ms ease-in`,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.light}`,
    marginBottom: theme.spacing(1),
    overflow: "hidden",
    width: "100%",
    "&:hover": {
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  }
}))
export default function ListItemOutline({ children, styles }) {
  const classes = useStyles();
  return <ListItem style={styles} className={classes.root}>
    {children}
  </ListItem>
}