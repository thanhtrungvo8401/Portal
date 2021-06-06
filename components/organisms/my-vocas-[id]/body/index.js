import React from "react";
import { Button, ButtonGroup, makeStyles, Typography } from "@material-ui/core";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import EmptyListMsg from "components/atoms/empty-list-msg";
import ListExpandItems from "components/molecules/list-expand-items";
import ConfirmPopup from "components/molecules/confirm-popup";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import { serviceDeleteVocaById } from "service/vocaService";
import { actionSetIsShowVocaModal, actionSetVocabularyObject } from "redux/actions/vocaActions";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyArr } from "utils/Helper";

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
  },
  actionEl: {
    "& .edit-btn": {
      color: theme.palette.text.secondary
    },
    "& .remove-btn": {
      color: theme.palette.error.main
    }
  }
}))
export default function MyVocasBody() {
  const classes = useStyles();
  const list = useSelector(state => state.vocas).list;
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = React.useState(false);

  const onOpenedConfirmDelete = (voca) => {
    setDeleteId(voca.id);
  }
  const onEdit = (voca) => {
    dispatch(actionSetVocabularyObject({ ...voca }));
    dispatch(actionSetIsShowVocaModal(true));
  }
  // API:
  const apiRemoveVoca = (id) => {
    if (id) dispatch(serviceDeleteVocaById(id));
  }
  // UI:
  const getVocaItems = list.map(v => {
    return {
      summaryEl: <div className={classes.summaryEl} >
        <Typography className='left' >{v.voca}</Typography>
        <Typography className='right' >{v.meaning}</Typography>
      </div>,
      actionsEl: <ButtonGroup className={classes.actionEl} variant="text" >
        <Button className="edit-btn" onClick={() => onEdit(v)} >Chỉnh sửa</Button>
        <Button className="remove-btn" onClick={() => onOpenedConfirmDelete(v)} >
          Xóa
        </Button>
      </ButtonGroup>
    }
  })
  return <BodyTop>
    <section className={classes.root} >
      <TitleBody>Danh sách từ vựng</TitleBody>
      <EmptyListMsg isActive={isEmptyArr(list)} />
      {/* Render Vocas List */}
      <ListExpandItems items={getVocaItems} />
      {/* Action Create new Voca */}
      <ActionsBtnGroup>
        <Button
          color="primary"
          variant="contained"
          onClick={() => dispatch(actionSetIsShowVocaModal(true))}
        >
          Tạo mới (+)
        </Button>
      </ActionsBtnGroup>

      {/* DELETE CONFIRM POPUP */}
      <ConfirmPopup
        isOpen={Boolean(deleteId)}
        title="Xác nhận"
        description="Bạn có chắc rằng mình muốn xóa từ vựng này không?"
        cancleAction={() => setDeleteId(false)}
        confirmAction={() => {
          apiRemoveVoca(deleteId);
          setDeleteId(null);
        }}
        closeAction={() => setDeleteId(null)}
      />
    </section>
  </BodyTop>
}