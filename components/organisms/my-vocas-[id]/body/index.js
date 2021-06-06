import React from "react";
import { Button, ButtonGroup, makeStyles, Typography } from "@material-ui/core";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import EmptyListMsg from "components/atoms/empty-list-msg";
import ListExpandItems from "components/molecules/list-expand-items";

import { useSelector } from "react-redux";
import { isEmptyArr } from "../../../../utils/Helper";

const useStyles = makeStyles(theme => ({
  root: {},
  summaryEl: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    "& .left": {
      color: theme.palette.text.secondary
    },
    "& .right": {
      color: theme.palette.text.secondary
    },
    [theme.breakpoints.up("md")]: {
      "& .left": {
        width: "50%"
      },
      "& .right": {
        width: "50%"
      },
    },
  }
}))
export default function MyVocasBody() {
  const classes = useStyles();
  const list = useSelector(state => state.vocas).list;

  const getVocaItems = list.map(v => {
    return {
      summaryEl: <div className={classes.summaryEl} >
        <Typography className='left' >{v.voca}</Typography>
        <Typography className='right' >{v.meaning}</Typography>
      </div>,
      actionsEl: <ButtonGroup variant="text" >
        <Button>Chỉnh sửa</Button>
        <Button>Xóa</Button>
      </ButtonGroup>
    }
  })
  return <BodyTop>
    <section className={classes.root} >
      <TitleBody>Danh sách từ vựng</TitleBody>
      <EmptyListMsg isActive={isEmptyArr(list)} />
      {/* Render Vocas List */}

      <ListExpandItems items={getVocaItems} />
    </section>
  </BodyTop>
}