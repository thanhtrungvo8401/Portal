import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import EmptyListMsg from "components/atoms/empty-list-msg";
import CardName from "components/molecules/card-name";
import { serviceGetSetVocas } from "service/setVocaService";
import { localStorageHelper } from "utils/storageHelper";
import { storageKey } from "utils/Constant";

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
  const { list, setVoca } = useSelector((state) => state.setVocas);
  const isEmptyPage = Boolean(!list.length);

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
            bgImage=""
            actions={
              <React.Fragment>
                <Button>VIEW</Button>
                <Button>VIEW</Button>
                <Button>VIEW</Button>
              </React.Fragment>
            }
          />
        })}
      </div>
    </div>
  </BodyTop>
}