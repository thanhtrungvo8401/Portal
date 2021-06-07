import VerticalMoveCover from "components/molecules/vertical-move-cover";
import BgColorOpacity from "components/atoms/bg-color-opacity";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import { makeStyles, Typography } from "@material-ui/core";
import { constantApp } from "utils/Constant";
import React from "react";

const useStyles = makeStyles(theme => ({
  CatImg: {
    display: "flex",
    justifyContent: "center"
  },
  RightText: {
    color: theme.palette.success.main, textAlign: "center"
  },
  WrongText: {
    color: theme.palette.error.main, textAlign: "center"
  }
}))

export default function CatAnnoucement({ type = 0, actions, onEntered, onExited, isActive }) {
  const [isActiveBg, setIsActiveBg] = React.useState(false);

  React.useEffect(() => {
    if (isActive) {
      setIsActiveBg(true);
    }
  }, [isActive]);

  const isTrue = (type !== 0);
  return <VerticalMoveCover
    isActive={isActive}
    onExited={() => {
      setIsActiveBg(false);
      onExited && onExited();
    }}
    onEntered={onEntered}
    bg={<BgColorOpacity isActive={isActiveBg} color={constantApp.COLOR.WHITE} opacity={1} />}
  >

    <div className={useStyles().CatImg} >
      <img
        src={isTrue ? "/image/congrats-cat.png" : "/image/thinking-cat.png"}
        alt={isTrue ? "congrats" : "try again"}
      />
    </div>

    <Typography
      className={isTrue ? useStyles().RightText : useStyles().WrongText}
      variant="h6" component="label"
    >
      {isTrue ? 'Hoàn toàn chính xác' : 'Kết quả chưa chính xác'}
    </Typography>

    {actions &&
      <ActionsBtnGroup center={true} >
        {actions}
      </ActionsBtnGroup>
    }

  </VerticalMoveCover>
}