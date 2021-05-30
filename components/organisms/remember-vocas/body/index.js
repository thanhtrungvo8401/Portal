import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleBody from "components/atoms/title-body";
import { BodyTop } from "components/atoms/body-wrapper";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import { Button, makeStyles } from "@material-ui/core";
import EmptyListMsg from "components/atoms/empty-list-msg";
import ConfirmPopup from "components/molecules/confirm-popup";
import CardName from "components/molecules/card-name";
import UpdateModal from "components/organisms/remember-vocas/update-modal";
import theme from "components/theme";
import { localStorageHelper } from "utils/storageHelper";
import { storageKey } from "utils/Constant";
import { serviceGetRememberOfOwnerId } from "service/rememberService";
import {
  actionSetIshowUpdateModal,
  actionSetRememberGroup
} from "redux/actions/rememberGroupAction";
import {
  serviceCreateRemember,
  serviceDeleteRememberById,
  serviceUpdateRemember,
} from "service/rememberService";
import { appUrl } from "utils/APP_URL";
import { navigate } from "utils/Helper";

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
  const { list, rememberGroup } = useSelector(state => state.rememberGroups);
  const [deleteId, setDeleteId] = React.useState();
  const isEmptyPage = Boolean(!list.length);
  // CardName Actions:
  const onGoToStudy = (remember) => {
    // IMPORTANT!: reset remember-group before go to detail page:
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
  // API:
  const apiDeleteRemember = (rememberId) => {
    dispatch(serviceDeleteRememberById(rememberId));
  }
  const apiUpdateRemember = () => {
    dispatch(serviceUpdateRemember(rememberGroup));
  };



  React.useEffect(() => {
    if (user.id) {
      dispatch(serviceGetRememberOfOwnerId(user.id));
    }
  }, [user.id]);

  return <BodyTop>
    <div className={classes.root}>
      <TitleBody>Nhóm từ vựng sẽ học</TitleBody>

      <EmptyListMsg isActive={isEmptyPage} />

      {/* RENDER LIST REMEMBER */}
      <div hidden={!isEmptyPage} className={classes.listItems}>
        {list.map((el) => {
          const total = el.vocaCodes.split(",").length;
          return <CardName
            key={el.id}
            object={{ name: el.name, total: total, date: el.createdDate }}
            bgImage="/image/learning-cat.png"
            actions={
              <React.Fragment>
                <Button
                  style={{ color: theme.palette.error.main }}
                  onClick={() => onConfirmDelete(el)}
                >Xóa</Button>
                <Button color="secondary" onClick={() => onEdit(el)}>
                  Edit
                </Button>
                <Button variant="outlined" color="primary" onClick={() => onGoToStudy(el)}>
                  Học ngay
                </Button>
              </React.Fragment>
            }
          />
        })}
      </div>
      <ActionsBtnGroup>
        <Button color="primary" variant="contained" >
          Tạo thêm (+)
        </Button>
      </ActionsBtnGroup>

      {/* DELETE CONFIRM POPUP */}
      <ConfirmPopup
        isOpen={Boolean(deleteId)}
        title="Xác nhận"
        description="Bạn có chắc rằng mình muốn xóa nhóm từ vựng này không?"
        cancleAction={() => setDeleteId(null)}
        confirmAction={() => {
          apiDeleteRemember(deleteId);
          setDeleteId(null);
        }}
        closeAction={() => setDeleteId(null)}
      />
      {/* UPDATE MODAL */}
      <UpdateModal onSubmit={apiUpdateRemember} />
    </div>
  </BodyTop>
}