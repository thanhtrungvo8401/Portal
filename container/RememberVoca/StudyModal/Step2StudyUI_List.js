import {
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import DataUsageIcon from '@material-ui/icons/DataUsage';

import React from "react";
import { animationDuration } from "./StudyModal";
import { getRandom } from "../../../utils/Helper";
import { jpSpeak } from "../../../utils/textToSpeech";
import theme from "../../../components/theme";

// LIST COMPONENT
const useStyles2 = makeStyles((theme) => ({
  DisplayVocas: {
    position: "absolute",
    zIndex: 0,
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    width: "100%",
    textAlign: "center",
    "& .one-voca": {
      transition: `all ${animationDuration}ms ease-in`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(1),
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        boxShadow:
          "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
      },
    },
    "& .one-voca-enter": {
      opacity: 0,
    },
    "& .one-voca-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .one-voca-exit": {
      opacity: 1,
    },
    "& .one-voca-exit-active": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    // Voca Meaning
    "& .voca-meaning": {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 1,
      padding: "8px 48px 8px 16px",
      boxSizing: "border-box",
      backgroundColor: theme.palette.background.paper,
      transform: "translateX(-100%)",
      opacity: 0,
    },
    "& .voca-meaning-enter": {
      transform: "translateX(100%)",
      opacity: 0,
    },
    "& .voca-meaning-enter-active": {
      transform: "translateX(0%)",
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .voca-meaning-enter-done": {
      transform: "translateX(0%)",
      opacity: 1,
    },
    "& .voca-meaning-exit": {
      transform: "translateX(0%)",
      opacity: 1,
    },
    "& .voca-meaning-exit-active": {
      transform: "translateX(-100%)",
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .voca-meaning-exit-done": {
      transform: "translateX(-100%)",
      opacity: 0,
    },
  },
  BtnGroup: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4),
    }
  }
}));
export default function DisplayVocas({ vocas = [] }) {
  const classes = useStyles2();
  const [vocasRender, setVocasRender] = React.useState([]);
  const handleToggleShowMeaning = (id) => {
    const newVocaRender = vocasRender.map((el) =>
      el.id === id ? { ...el, isShow: !el.isShow } : el
    );
    setVocasRender(newVocaRender);
  };
  const handleRandomVoca = () => {
    const oldList = [...vocasRender];
    const newList = [];
    setVocasRender([]);
    setTimeout(() => {
      while (oldList.length > 0) {
        const rand = getRandom(0, oldList.length - 1);
        newList.push(oldList[rand]);
        oldList.splice(rand, 1);
      }
      setVocasRender(newList);
    }, animationDuration);
  };
  React.useEffect(() => {
    if (vocas.length) {
      setVocasRender([
        { ...vocas[vocas.length - 1], isShow: false },
        ...vocasRender,
      ]);
    }
  }, [vocas]);
  if (!vocas.length) return null;
  return (
    <Container className={classes.DisplayVocas}>
      <List>
        <TransitionGroup className="vocas-group">
          {vocasRender.map((voca) => {
            return (
              <CSSTransition
                key={voca.id}
                classNames="one-voca"
                timeout={animationDuration}
              >
                <ListItem
                  className="one-voca"
                  onClick={() => handleToggleShowMeaning(voca.id)}
                >
                  {/* JP */}
                  <Typography color="primary" variant="h6">
                    {voca.voca}
                  </Typography>
                  {/* VN */}
                  <CSSTransition
                    classNames="voca-meaning"
                    timeout={animationDuration}
                    in={voca.isShow}
                  >
                    <Typography
                      className="voca-meaning"
                      color="textSecondary"
                      style={{ fontWeight: "lighter" }}
                      variant="h6"
                    >
                      {voca.meaning}
                    </Typography>
                  </CSSTransition>
                  <ListItemSecondaryAction
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <VolumeUpRoundedIcon
                      onClick={() => jpSpeak({ content: voca.voca })}
                      style={{ cursor: "pointer" }}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </List>
      <ButtonGroup
        className={classes.BtnGroup}
        color="primary"
        aria-label="outlined primary button group"
        variant="outlined"
      >
        <Button onClick={() => handleRandomVoca()}>
          <SyncRoundedIcon style={{ marginRight: theme.spacing(1) }} />
          Trộn từ
        </Button>
        <Button>
          <DataUsageIcon style={{ marginRight: theme.spacing(1) }} />
          Random Speak
        </Button>
      </ButtonGroup>
    </Container>
  );
}
