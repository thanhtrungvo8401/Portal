import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import EmptyListMsg from "components/atoms/empty-list-msg";
import CardName from "components/molecules/card-name";
import ConfirmPopup from "components/molecules/confirm-popup";
import { serviceDeleteSetVocas, serviceGetSetVocas } from "service/setVocaService";
import { localStorageHelper } from "utils/storageHelper";
import { storageKey } from "utils/Constant";
import { navigate } from "utils/Helper";
import { appUrl } from "utils/APP_URL";
import { actionSetIsShowSetVocaModal, actionSet_SetVocaObject } from "redux/actions/setVocasActions";
import theme from "components/theme";

const useStyles = makeStyles(theme => ({
  root: {},
  listItems: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }
}))
export default function MyVocasBody() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { list } = useSelector((state) => state.setVocas);
  const [deleteId, setDeleteId] = React.useState();
  const isEmptyPage = Boolean(!list.length);

  const onGoToDetail = (set) => {
    navigate(appUrl.setVocaDetail(set.id).url);
  }
  const onConfirmDelete = (set) => {
    setDeleteId(set.id)
  }
  const onEdit = (set) => {
    dispatch(actionSet_SetVocaObject({ ...set }));
    dispatch(actionSetIsShowSetVocaModal(true));
  }
  // API:
  const apiRemoveSetVoca = (id) => {
    dispatch(serviceDeleteSetVocas(id));
  };
  React.useEffect(() => {
    if (user.id) {
      dispatch(serviceGetSetVocas(user.id));
    }
  }, [user.id]);

  return <BodyTop>
    <div className={classes.root} >
      <TitleBody>Những nhóm từ vựng đã tạo</TitleBody>
      <EmptyListMsg isActive={isEmptyPage} />
      {/* RENDER LIST VOCAS */}
      <div hidden={isEmptyPage} className={classes.listItems} >
        {list.map((el) => {
          return <CardName
            key={el.id}
            object={{ name: el.setName, total: el.totalVocas, date: el.createdDate }}
            bgImage="/image/create-vocas.png"
            actions={
              <React.Fragment>
                <Button
                  style={{ color: theme.palette.error.main }}
                  onClick={() => onConfirmDelete(el)}>
                  Xóa
                </Button>
                <Button color="secondary" onClick={() => onEdit(el)} >
                  Edit
                </Button>
                <Button color="primary" onClick={() => onGoToDetail(el)} >
                  Chi tiết
                </Button>
              </React.Fragment>
            }
          />
        })}
      </div>

      {/* DELETE CONFIRM POPUP */}
      <ConfirmPopup
        isOpen={Boolean(deleteId)}
        title="Xác nhận"
        description="Bạn có chắc rằng mình muốn xóa bài học mình đã tạo không?"
        cancleAction={() => setDeleteId(null)}
        confirmAction={() => {
          apiRemoveSetVoca(deleteId);
          setDeleteId(null);
        }}
        closeAction={() => setDeleteId(null)}
      />
    </div>
  </BodyTop>
}