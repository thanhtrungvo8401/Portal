import {
  Box,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import React from "react";
import theme from "../../../components/theme";
import { styleStep_X_StudyUI } from "./StudyModal";

const useStyles = makeStyles((theme) => {
  return {
    Step4StudyUI: styleStep_X_StudyUI,
    Step4StudyUI_2: {
      paddingTop: theme.spacing(2),
    },
    listeningIcon: {
      animation: `$listeningAnimation 1s ${theme.transitions.easing.easeInOut} 200ms infinite`,
    },
    "@keyframes listeningAnimation": {
      "0%": {
        transform: "translateY(-20px)",
      },
      "50%": {
        transform: "translateY(0)",
      },
      "100%": {
        transform: "translateY(-20px)",
      },
    },
  };
});

export default function Step4StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
  const [list, setList] = React.useState([...study.vocas]);
  return (
    <section className={`${classes.Step4StudyUI} ${classes.Step4StudyUI_2}`}>
      <Container style={{ textAlign: "center" }}>
        {/* Intruction */}
        <Typography color="primary">
          Click vào (<MicNoneIcon style={{ transform: "translateY(5px)" }} />)
          và đọc thành tiếng từ ứng với nghĩa bên dưới
        </Typography>
        {/* Vietnamese Meaning */}
        <Paper
          elevation={3}
          style={{
            textAlign: "center",
            marginTop: theme.spacing(4),
            display: "block",
            padding: `${theme.spacing(1)}px 0px`,
            backgroundColor: "transparent",
          }}
        >
          <Typography
            variant="h6"
            style={{
              fontWeight: "lighter",
            }}
            component="label"
            color="primary"
          >
            {list[0].meaning}
          </Typography>
        </Paper>
        {/* Micro Icon */}
        <IconButton
          style={{ marginTop: theme.spacing(4), position: "relative" }}
        >
          <MicNoneIcon
            style={{
              width: "4rem",
              height: "4rem",
              // color: theme.palette.error.main,
            }}
          />
          <Typography
            color="error"
            variant="caption"
            style={{
              position: "absolute",
              textAlign: "center",
              width: "200%",
              left: "50%",
              top: "100%",
              transform: "translate(-50%, -50%)",
              display: "block",
            }}
          >
            Meomeo-kun đang lắng nghe...
          </Typography>
        </IconButton>
        {/* Result */}
        <Box component="div" style={{ marginTop: theme.spacing(4) }}>
          {/* {[0, 0.2, 0.4].map((el) => {
            return (
              <FiberManualRecordIcon
                className={classes.listeningIcon}
                style={{
                  animationDelay: `${el}s`,
                  fontSize: "1rem",
                  margin: "0 8px",
                }}
                color="primary"
                key={el}
              />
            );
          })} */}
          <Typography
            variant="h3"
            component="label"
            style={{ display: "block" }}
            color="textSecondary"
          >
            {list[0].voca}
          </Typography>
        </Box>
        <Box
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckIcon
            style={{ fontSize: "7rem", color: theme.palette.success.main }}
          />
          {/* <CloseIcon
            style={{ fontSize: "7rem", color: theme.palette.error.main }}
          /> */}
        </Box>
      </Container>
    </section>
  );
}
