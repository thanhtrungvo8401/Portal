import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { CSSTransition } from "react-transition-group";
import theme from "../../../components/theme";
import { styleStep_X_StudyUI } from "./StudyModal";

// MAIN UI
const useStyles = makeStyles((theme) => ({
  Step3StudyUI: styleStep_X_StudyUI,
}));

export default function Step3StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
  const [list, setList] = React.useState([...study.vocas]);
  const [voca, setVoca] = React.useState(study.vocas[3]);
  return (
    <div className={classes.Step3StudyUI}>
      <Container style={{ paddingTop: theme.spacing(1) }}>
        <Typography color="primary">Chọn nghĩa cho mỗi từ bên dưới</Typography>

        <CSSTransition>
          <Paper
            elevation={3}
            style={{
              padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
              marginTop: theme.spacing(2),
              textAlign: "center",
            }}
          >
            <Typography
              style={{ textAlign: "center" }}
              variant="h5"
              color="primary"
            >
              {voca.voca}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {voca.note}
            </Typography>
          </Paper>
        </CSSTransition>
      </Container>
    </div>
  );
}
