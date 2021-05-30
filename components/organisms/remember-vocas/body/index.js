import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleBody from "components/atoms/title-body";
import CardName from "components/atoms/card-name";
import { BodyTop } from "components/atoms/body-wrapper";
import { Box, Button, makeStyles } from "@material-ui/core";
import EmptyList from "components/atoms/empty-list";
import theme from "components/theme";
import { localStorageHelper } from "utils/storageHelper";
import { storageKey } from "utils/Constant";
import { serviceGetRememberOfOwnerId } from "service/rememberService";
import { actionSetIshowUpdateModal, actionSetRememberGroup } from "redux/actions/rememberGroupAction";
import { appUrl } from "utils/APP_URL";

const useStyles = makeStyles(theme => ({
  root: {},
  listItems: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}))

export default function RememberVocasBody() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { list } = useSelector(state => state.rememberGroups);
  const [deleteId, setDeleteId] = React.useState();

  const onGoToStudy = (remember) => {
    dispatch(actionSetRememberGroup({}));
    navigate(appUrl.rememberVocaWithId(remember.id).url);
  }
  const onConfirmDelete = (remember) => {
    setDeleteId(remember.id)
  }
  const onEdit = (remember) => {
    dispatch(actionSetRememberGroup(remember));
    dispatch(actionSetIshowUpdateModal(true));
  }



  React.useEffect(() => {
    if (user.id) {
      dispatch(serviceGetRememberOfOwnerId(user.id));
    }
  }, [user.id]);

  return <BodyTop>
    <div className={classes.root}>
      <TitleBody>Nhóm từ vựng sẽ học</TitleBody>

      <EmptyList isActive={list.length === 0} />

      <Box hidden={list.length === 0} className={classes.listItems} component='div' >
        {/* RENDER LIST REMEMBER */}
        {list.map((el) => {
          const total = el.vocaCodes.split(",").length;
          return <CardName
            key={el.id}
            object={{ name: el.name, total: total, date: el.createdDate }}
            bgImage="/image/learning-cat.png"
            onClick={() => { }}
            actions={
              <React.Fragment>
                <Button style={{ color: theme.palette.error.main }} >Remove</Button>
                <Button color="secondary" >Edit</Button>
                <Button variant="contained" color="primary" >Study</Button>
              </React.Fragment>
            }
          />
        })}
      </Box>
    </div>
  </BodyTop>
}