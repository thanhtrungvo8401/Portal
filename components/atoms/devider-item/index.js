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
  },
  dividerVertical: {
    height: 32,
    margin: "0 4px",
    transform: "translateY(6px)",
  }
}));

export default function DividerItem({ isHasLine, isVertical = false }) {
  const classes = useStyles();
  return isHasLine
    ? !isVertical
      ? <Divider className={classes.divider} />
      : <Divider className={classes.dividerVertical} orientation="vertical" />
    : <div className={classes.div} ></div>
}