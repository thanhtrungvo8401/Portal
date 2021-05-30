import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(3)
    },
    "& .text": {
      width: "100%",
      textAlign: "center"
    }
  }
}))

export default function EmptyList({ isActive }) {
  const classes = useStyles();
  return isActive
    ? <div className={classes.root} >
      <img alt='Empty list icon' src="/image/sleep-cat.png" />
      <Typography className="text" color="textSecondary" >Danh sách rỗng</Typography>
    </div>
    : null;
}