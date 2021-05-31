import React from "react";
import { Button, Chip, makeStyles, Paper } from "@material-ui/core";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import PublishIcon from "@material-ui/icons/Publish";
import Instruction from "components/organisms/remember-vocas-[id]/step-1/instruction";
import EmptyListMsg from "components/atoms/empty-list-msg";
import TitleItem from "components/atoms/title-item";
import TitleBody from "components/atoms/title-body";
import DividerItem from "components/atoms/devider-item";
import { BodyTop } from "components/atoms/body-wrapper";
import styles from "components/Layouts/styles.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0 auto",
    zIndex: 0,
    display: "inline-flex",
    justifyContent: 'center',
    flexWrap: "wrap"
  },
  card: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: "100%",
  }
}));

export default function Remember_Id_Step1({ study, actionUpdate, actionChangeStep }) {
  const classes = useStyles();
  const [detailList, setDetailList] = React.useState([]);
  const { vocas, inActiveVocas } = study;

  const actionInActiveVoca = (voca) => actionUpdate({
    ...study,
    vocas: vocas.filter((el) => el.id !== voca.id),
    inActiveVocas: [...inActiveVocas, voca],
  });

  const actionActiveVoca = (voca) => actionUpdate({
    ...study,
    inActiveVocas: inActiveVocas.filter((el) => el.id !== voca.id),
    vocas: [...vocas, voca],
  });

  const toggleDetail = (voca) => setDetailList(
    detailList.includes(voca.id)
      ? detailList.filter((id) => id !== voca.id)
      : [...detailList, voca.id]
  );
  return (
    <React.Fragment>
      <Instruction />
      <BodyTop>
        <TitleBody>Nội dung bài học</TitleBody>
        <div className={classes.root}>
          <TitleItem>
            Những từ bạn sẽ học cùng Meomeo-kun
          </TitleItem>
          {vocas.length > 0 &&
            <div elevation={3} className={classes.card} >
              {vocas.map((voca) => (
                <Chip
                  className={classes.chip}
                  key={voca.id}
                  label={
                    !detailList.includes(voca.id) ? voca.voca : `${voca.voca}(${voca.meaning})`
                  }
                  clickable
                  color="primary"
                  onDelete={() => actionInActiveVoca(voca)}
                  onClick={() => toggleDetail(voca)}
                />
              ))}
            </div>
          }
          <EmptyListMsg isActive={vocas.length === 0} />
          <DividerItem />
          <TitleItem>
            Những từ bạn đã thuộc hoặc muốn bỏ qua
          </TitleItem>
          {inActiveVocas.length > 0 &&
            <div elevation={3} className={classes.card}>
              {inActiveVocas.map((voca) => (
                <Chip
                  className={classes.chip}
                  key={voca.id}
                  label={
                    !detailList.includes(voca.id) ? voca.voca : `${voca.voca}(${voca.meaning})`
                  }
                  color="primary"
                  clickable
                  onDelete={() => actionActiveVoca(voca)}
                  onClick={() => toggleDetail(voca)}
                  deleteIcon={<PublishIcon />}
                />
              ))}
            </div>
          }
          <EmptyListMsg isActive={inActiveVocas.length === 0} />

          <ActionsBtnGroup center={true} >
            <Button
              onClick={() => actionChangeStep(2)} // step = 2 XXX
              className={styles.flashEffect}
              variant="contained"
              color="primary"
            >
              Let's go
        </Button>
          </ActionsBtnGroup>
        </div>
      </BodyTop>
    </React.Fragment>
  );
}
