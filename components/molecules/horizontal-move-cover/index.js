import { makeStyles } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { cssAnimationHelper } from "utils/AnimationHelper";
import { constantApp } from "utils/Constant";

const animationDuration = constantApp.animationDuration;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  transitionCover: {
    ...cssAnimationHelper("horizontal-move-cover",
      {
        opacity: 0,
        transform: "translateX(-50vw)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        transform: "translateX(0)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      true
    ),
    "& .go-back": {
      position: "absolute",
      top: "50%",
      left: 0,
      transform: "translate(-100%, -50%)",
      width: "5rem",
      opacity: 0,
    },
    "& .go-on": {
      position: "absolute",
      top: "50%",
      right: 0,
      transform: "translate(100%, -50%)",
      width: "5rem",
      opacity: 0,
    },
  }
}))

export default function HorizontalMoveCover({ isActive, onEntered, onExited, children, styles = {} }) {
  const classes = useStyles();
  return <div className={classes.root} >
    <CSSTransition
      timeout={animationDuration}
      onEntered={onEntered && onEntered()}
      onExited={onExited && onExited()}
      in={isActive}
      classNames="horizontal-move-cover"
    >
      <div className={classes.transitionCover} >
        {children}
      </div>
    </CSSTransition>
  </div>
}