import React from "react";
import { CSSTransition } from "react-transition-group";
import BgColorOpacity from "components/atoms/bg-color-opacity";
import { constantApp } from "utils/Constant";
import { makeStyles } from "@material-ui/core";
import { cssAnimationHelper } from "utils/AnimationHelper";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    zIndex: 2,
    textAlign: "Center",
    top: "50%",
    left: "50%",
    transform: "translateY(-100%) translateX(-50%)",
    top: 0,
    opacity: 0,
    ...cssAnimationHelper("vertical-move-cover",
      {
        opacity: 0,
        top: 0,
        transform: "translateY(-100%) translateX(-50%)",
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        top: "50%",
        transform: "translateY(-50%) translateX(-50%)",
        transition: `all ${constantApp.animationDuration}ms ease-in`,
      },
      true
    ),
  }
}))

export default function VerticalMoveCover({ isActive, onEntered, onExited, children, styles = {}, bg }) {
  return <React.Fragment>
    {bg ? bg : <BgColorOpacity isActive={isActive} />}
    <CSSTransition
      timeout={constantApp.animationDuration}
      onEntered={() => onEntered && onEntered()}
      onExited={() => onExited && onExited()}
      in={isActive}
      classNames="vertical-move-cover"
    >
      <div style={styles} className={useStyles().root} >
        {children}
      </div>
    </CSSTransition>
  </React.Fragment>
}