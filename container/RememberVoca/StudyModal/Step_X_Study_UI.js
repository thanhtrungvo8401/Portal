import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DragDropComponent from "../../../components/DragDropComponent";
import theme from "../../../components/theme";
import { animationDuration, styleStep_X_StudyUI } from "./StudyModal";
import { CSSTransition } from "react-transition-group";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles(theme => ({
  Step3StudyUI: styleStep_X_StudyUI,
  OneColumn: {
    position: "relative",
    overflow: "hidden",
    width: '100%',
    "& .react-dnd-element:nth-child(2n + 1)": {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    "& .react-dnd-element:nth-child(2n)": {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1),
      boxShadow: 'rgb(0 0 0 / 0%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 0%) 0px 1px 8px 0px',
    },
    "& .step-result": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 3,
      textAlign: "center",
      left: '150%',
      opacity: 0,
    },
    "& .step-result.step-result-enter": {
      left: '150%',
      opacity: 0,
    },
    "& .step-result.step-result-enter-done": {
      left: '50%',
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .step-result.step-result-enter-done": {
      left: '50%',
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .step-result.step-result-exit": {
      left: '50%',
      opacity: 1,
    },
    "& .step-result.step-result-exit-done": {
      left: '150%',
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .step-result.step-result-exit-done": {
      left: '150%',
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    }
  },
  BgDiv: {
    backgroundColor: `rgba(255, 255, 255, ${theme.opacity['8']})`,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
    left: 0,
    top: 0,
    opacity: 0,
    "&.bg-div-enter": {
      zIndex: 2,
      opacity: 0
    },
    "&.bg-div-enter-active": {
      zIndex: 2,
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.bg-div-enter-done": {
      zIndex: 2,
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.bg-div-exit": {
      zIndex: 2,
      opacity: 1
    },
    "&.bg-div-exit-active": {
      zIndex: 2,
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.bg-div-exit-done": {
      zIndex: 0,
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
  }
}))

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: theme.spacing(1),
  fontSize: "1rem",
  lineHeight: "1.5rem",
  background: isDragging
    ? `rgba(255,255,255,${theme.opacity[5]})`
    : `rgba(255,255,255,${theme.opacity[2]})`,
  textAlign: "center",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: isDraggingOver
    ? theme.shadows[5]
    : theme.shadows[3],
  width: "100%",
  padding: theme.spacing(1),
  position: "relative",
  zIndex: 1
});

export default function Step_X_StudyUI({ vocas, actionUpdateBg }) {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);
  const [result, setResult] = React.useState({ isChecked: false, isTrue: false });

  const checkResult = () => {
    for (let i = 0; i < items.length; i = i + 2) {
      const id1 = items[i].id.split("_")[0];
      const id2 = items[i + 1].id.split("_")[0];
      if (id1 !== id2) {
        return setResult({ isChecked: true, isTrue: false })
      }
    }
    return setResult({ isChecked: true, isTrue: true })
  }

  React.useEffect(() => {
    if (vocas.length > 0) {
      const listVoca = vocas.map(el => ({ id: el.id + "_voca", content: el.voca }));
      const listMeaning = vocas.map(el => ({ id: el.id + "_meaning", content: el.meaning }));
      const listItems = [...listVoca, ...listMeaning].sort((a, b) => a.content > b.content ? -1 : 1);
      setItems(listItems);
    }
  }, [vocas]);
  return <section className={classes.Step3StudyUI} >
    {/* click to listen to instruction */}
    <Button
      color="default"
      style={{ marginBottom: theme.spacing(2) }} >
      <HelpOutlineIcon style={{ fontSize: "2.5rem", marginRight: theme.spacing(1) }} />
      <Typography
        color="textSecondary"
      >
        Click để nghe hướng dẫn
      </Typography>
    </Button>
    {/* main body */}
    <Box className={classes.OneColumn} >
      {/* DragDropComponent */}
      <DragDropComponent
        items={items}
        actionUpdate={setItems}
        itemsStyle={getItemStyle}
        listStyle={getListStyle}
      />
      {/* result div */}
      <CSSTransition
        timeout={animationDuration}
        classNames="step-result"
        in={result.isChecked}
      >
        <div className="step-result">
          <div style={{ textAlign: "center" }} >
            {result.isTrue && <VerifiedUserIcon
              style={{ color: theme.palette.success.main, fontSize: "5rem" }} />
            }
            {!result.isTrue && <SentimentVeryDissatisfiedIcon
              style={{ color: theme.palette.error.main, fontSize: "5rem" }} />
            }
          </div>

          <Typography variant="h6"
            style={{
              color: result.isTrue
                ? theme.palette.success.main
                : theme.palette.error.main
              , textAlign: "center"
            }}
            component="label" >
            {result.isTrue ? 'Hoàn toàn chính xác' : 'Kết quả chưa chính xác !'}
          </Typography>

          <div style={{ textAlign: "center" }} >
            <Button color="primary" variant="contained"
              onClick={() => {
                if (!result.isTrue) {
                  setResult({ isChecked: false, isTrue: false })
                } else {
                  actionUpdateBg({ step: 3 })
                }

              }}
              style={{ marginTop: theme.spacing(4) }} >
              {result.isTrue ? "Next" : "Thử lại"}
            </Button>
          </div>
        </div>
      </CSSTransition>
      {/* bg div */}
      <CSSTransition timeout={animationDuration} classNames="bg-div" in={result.isChecked}>
        <div className={`${classes.BgDiv}`} ></div>
      </CSSTransition>
    </Box>
    {/* Check btn */}
    <Box
      hidden={result.isChecked}
      component="div"
      style={{ textAlign: "center", marginTop: theme.spacing(5) }} >
      <Button
        color="primary"
        variant="contained"
        onClick={() => checkResult()} >
        Kiểm tra kết quả
      </Button>
    </Box>
  </section >
}