import TitleBody from "components/atoms/title-body";
import CardName from "components/atoms/card-name";
import { BodyTop } from "components/atoms/body-wrapper";
import { Button, makeStyles } from "@material-ui/core"
import React from "react";
import theme from "../../../theme";

const useStyles = makeStyles(theme => ({
  root: {}
}))

export default function RememberVocasBody() {
  const classes = useStyles();
  return <BodyTop>
    <div className={classes.root}>
      <TitleBody>Nhóm từ vựng sẽ học</TitleBody>
      <div>
        <CardName
          object={{ name: "Bai 26-01", total: 10, date: '30/05/2021' }}
          bgText={{ content: "暗記", color: theme.palette.primary.main }}
          onClick={() => { }}
          actions={
            <React.Fragment>
              <Button>View</Button>
              <Button>View</Button>
              <Button>View</Button>
            </React.Fragment>
          }
        />
      </div>
    </div>
  </BodyTop>
}