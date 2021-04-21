import { Button, Chip, makeStyles, Paper, Typography } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import React from "react";
import theme from "../../components/theme";
import styles from "../../components/Layouts/styles.module.css";
const useStyles = makeStyles((theme) => ({
  step1Study: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
    zIndex: 0,
  },
}));

export default function Step1Study({
  study,
  actionUpdate,
  actionBgAnimationStep,
}) {
  const [detailList, setDetailList] = React.useState([]);
  const classes = useStyles();
  const { vocas, inActiveVocas } = study;
  const actionInActiveVoca = (voca) => {
    actionUpdate({
      ...study,
      vocas: vocas.filter((el) => el.id !== voca.id),
      inActiveVocas: [...inActiveVocas, voca],
    });
  };
  const actionActiveVoca = (voca) => {
    actionUpdate({
      ...study,
      inActiveVocas: inActiveVocas.filter((el) => el.id !== voca.id),
      vocas: [...vocas, voca],
    });
  };
  const toggleDetail = (voca) => {
    setDetailList(
      detailList.includes(voca.id)
        ? detailList.filter((id) => id !== voca.id)
        : [...detailList, voca.id]
    );
  };
  return (
    <div className={classes.step1Study}>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        You will learn these word
      </Typography>
      <Paper elevation={3} style={{ padding: theme.spacing(2) }}>
        <Typography hidden={vocas.length} variant="body2">
          Empty
        </Typography>
        {vocas.map((voca) => (
          <Chip
            key={voca.id}
            label={
              !detailList.includes(voca.id)
                ? voca.voca
                : `${voca.voca}(${voca.meaning})`
            }
            clickable
            color="primary"
            style={{
              marginRight: theme.spacing(1),
              marginBottom: theme.spacing(1),
              maxWidth: "100%",
            }}
            onDelete={() => actionInActiveVoca(voca)}
            onClick={() => toggleDetail(voca)}
          />
        ))}
      </Paper>

      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1), marginTop: theme.spacing(4) }}
      >
        Won't learn
      </Typography>
      <Paper elevation={3} style={{ padding: theme.spacing(2) }}>
        <Typography hidden={inActiveVocas.length} variant="body2">
          Empty
        </Typography>
        {inActiveVocas.map((voca) => (
          <Chip
            key={voca.id}
            label={
              !detailList.includes(voca.id)
                ? voca.voca
                : `${voca.voca}(${voca.meaning})`
            }
            color="primary"
            clickable
            style={{
              marginRight: theme.spacing(1),
              marginBottom: theme.spacing(1),
              maxWidth: "100%",
            }}
            onDelete={() => actionActiveVoca(voca)}
            deleteIcon={<PublishIcon />}
            onClick={() => toggleDetail(voca)}
          />
        ))}
      </Paper>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Button
          onClick={() => actionBgAnimationStep(1)}
          className={styles.flashEffect}
          variant="contained"
          color="primary"
        >
          READY AND ENJOY
        </Button>
      </div>
    </div>
  );
}
