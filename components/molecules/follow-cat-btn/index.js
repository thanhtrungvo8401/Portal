import { makeStyles, Typography } from "@material-ui/core";
import ActionBtnsGroup from "components/atoms/action-btns-group";
import { constantApp } from "utils/Constant";
import { cssAnimationHelper } from "utils/AnimationHelper";
import { CSSTransition } from "react-transition-group";
const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-flex",
    justifyContent: "center",
    flexWrap: "wrap",
    cursor: "pointer",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    transition: `all ${constantApp.animationDuration}ms ease-in`,
    transform: 'translate(0, 0)',
    "&:hover": {
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 4px 0px rgb(0 0 0 / 12%)",
      transform: 'translate(0,-2px)',
    },
    ...cssAnimationHelper("follow-me", {
      transform: 'translate(100vw, 0)',
      transition: `all ${constantApp.animationDuration}ms ease-in`,
    }, {
      transform: 'translate(0, 0)',
      transition: `all ${constantApp.animationDuration}ms ease-in`,
    }, true)
  },
  text: {
    width: "100%",
    textAlign: "center"
  },
}))
export default function FollowCatBtn({ description, onClick, isIn, onExited, hidden }) {
  if (hidden) return null;
  const classes = useStyles();
  return <ActionBtnsGroup center={true} >
    <CSSTransition in={isIn} onExited={onExited} classNames="follow-me" timeout={constantApp.animationDuration} >
      <div className={classes.root} onClick={onClick} >
        <img src="/image/follow-cat.png" alt="follow-me" />
        <Typography className={classes.text} variant="subtitle1" color="textSecondary" >{description}</Typography>
      </div>
    </CSSTransition>
  </ActionBtnsGroup>
}