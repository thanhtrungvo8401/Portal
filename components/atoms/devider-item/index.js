import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: `${theme.spacing(1)}px 0px`,
    width: "100%"
  },
  div: {
    height: `${theme.spacing(2)}px`,
    width: "100%"
  }
}))

export default function DividerItem({ isHasLine }) {
  const classes = useStyles();
  return isHasLine
    ? <Divider className={classes.divider} />
    : <div className={classes.div} ></div>
}