import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import FollowCatBtn from "components/molecules/follow-cat-btn";
import { BodyTop } from "components/atoms/body-wrapper";

export default function TestGroupStep1({ actionChangeStep }) {
  const { list } = useSelector(state => state.vocas);
  const [readyToGo, setReadyToGo] = React.useState({ ready: false });
  const totalQuestion = list.length;
  return <BodyTop>
    <Typography style={{ textAlign: "center" }} color="primary" variant="h1" component="div" >
      {totalQuestion}
    </Typography>
    <Typography variant="h6" component="div" style={{ textAlign: "center" }}>
      từ vựng đang đợi bạn vượt qua
    </Typography>

    <FollowCatBtn
      isIn={!readyToGo.ready}
      description={"Tôi đã sẵn sàng"}
      onClick={() => setReadyToGo({ ready: true })}
      onExited={() => actionChangeStep(2)}
    />
  </BodyTop>
}