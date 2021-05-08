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
import { jpRecognition } from "../../../utils/speechToText";
import { getRandom } from "../../../utils/Helper";

const useStyles = makeStyles((theme) => {
  return {
    Step4StudyUI: styleStep_X_StudyUI,
    Step4StudyUI_2: {
      paddingTop: theme.spacing(2),
    },
    listeningIcon: {
      animation: `$listeningAnimation 0.8s ${theme.transitions.easing.easeInOut} 200ms infinite`,
    },
    "@keyframes listeningAnimation": {
      "0%": {
        transform: "translateY(-10px)",
      },
      "50%": {
        transform: "translateY(0)",
      },
      "100%": {
        transform: "translateY(-10px)",
      },
    },
  };
});

export default function Step4StudyUI({ study, actionUpdateBg }) {
  const classes = useStyles();
  const [list, setList] = React.useState(
    study.vocas.map((el) => ({ ...el, count: 0 }))
  );
  const [voca, setVoca] = React.useState({});
  const [resultRecog, setResultRecog] = React.useState("");
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const nextVoca = () => {
    if (list.length === 0) {
      return alert("DONE");
    }
    const randVoca = list[getRandom(0, list.length - 1)];
    setVoca(randVoca);
    randVoca.count++;
    if (randVoca.count === 1) {
      setList(list.map((el) => (el.id === randVoca.id ? randVoca : el)));
    } else {
      setList(list.filter((el) => el.id !== randVoca.id));
    }
  };
  const onStart = (e) => {
    setResultRecog("");
    setErrorMsg("");
    setIsListening(true);
  };
  const onSpeechStart = (e) => {
    setIsSpeaking(true);
  };
  const onSpeechEnd = (e) => {
    setIsListening(false);
    setIsSpeaking(false);
  };
  const onError = (e) => {
    const { error, message } = e;
    console.log("onError", error, message);
    if (error === "no-speech") {
      setErrorMsg("Meomeo-kun không thể nghe được âm thanh từ bạn !!!");
    }
    setIsListening(false);
    setIsSpeaking(false);
  };
  const onResult = (result) => {
    setResultRecog(result);
    console.log(result);
  };
  const jpRecogTool = jpRecognition({
    onResult,
    onStart,
    onSpeechEnd,
    onSpeechStart,
    onError,
  });

  React.useEffect(() => {
    nextVoca();
  }, []);
  React.useEffect(() => {
    console.log(list);
  }, [list]);
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
            {voca.meaning}
          </Typography>
        </Paper>
        {/* Micro Icon */}
        <IconButton
          onClick={() => jpRecogTool.start()}
          style={{ marginTop: theme.spacing(4), position: "relative" }}
        >
          <MicNoneIcon
            style={{
              width: "4rem",
              height: "4rem",
              color: `${isListening ? theme.palette.error.main : ""}`,
            }}
          />
          <Typography
            color={isListening ? "error" : "textSecondary"}
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
            {isListening ? "Meomeo-kun đang lắng nghe..." : "Click to speak"}
          </Typography>
        </IconButton>
        {/* Result */}
        <Box component="div" style={{ marginTop: theme.spacing(6) }}>
          {isListening &&
            [0, 0.2, 0.4].map((el) => {
              return (
                <FiberManualRecordIcon
                  className={isSpeaking ? classes.listeningIcon : ""}
                  style={{
                    animationDelay: `${el}s`,
                    fontSize: "1rem",
                    margin: "0 8px",
                  }}
                  color="primary"
                  key={el}
                />
              );
            })}
          {resultRecog && (
            <Typography
              variant="h3"
              component="label"
              style={{ display: "block" }}
              color="textSecondary"
            >
              {resultRecog}
            </Typography>
          )}
          {errorMsg && (
            <Typography
              variant="h6"
              component="label"
              style={{ display: "block", fontWeight: "lighter" }}
              color="error"
            >
              {errorMsg}
            </Typography>
          )}
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
          {/* <CheckIcon
            style={{ fontSize: "7rem", color: theme.palette.success.main }}
          /> */}
          {/* <CloseIcon
            style={{ fontSize: "7rem", color: theme.palette.error.main }}
          /> */}
        </Box>
      </Container>
    </section>
  );
}
