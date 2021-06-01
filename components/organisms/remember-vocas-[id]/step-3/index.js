import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import DragDropComponent from "components/DragDropComponent";
import theme from "components/theme";
import { constantApp } from "utils/Constant";
import { CSSTransition } from "react-transition-group";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Instruction_Step3 from "components/organisms/remember-vocas-[id]/step-3/instruction";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import BgColorOpacity from "components/atoms/bg-color-opacity";
import { cssAnimationHelper } from "utils/AnimationHelper";
const { animationDuration } = constantApp;

const useStyles = makeStyles(theme => ({
  OneColumn: {
    position: "relative",
    overflow: "hidden",
    minHeight: '20rem',
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
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateY(-100%) translateX(-50%)",
      zIndex: 2,
      textAlign: "center",
      opacity: 0,
    },
    // "& .step-result.step-result-enter": {
    //   left: '150%',
    //   opacity: 0,
    // },
    // "& .step-result.step-result-enter-active": {
    //   left: '50%',
    //   opacity: 1,
    //   transition: `all ${animationDuration}ms ease-in`,
    // },
    // "& .step-result.step-result-enter-done": {
    //   left: '50%',
    //   opacity: 1,
    //   transition: `all ${animationDuration}ms ease-in`,
    // },
    // "& .step-result.step-result-exit": {
    //   left: '50%',
    //   opacity: 1,
    // },
    // "& .step-result.step-result-exit-active": {
    //   left: '150%',
    //   opacity: 0,
    //   transition: `all ${animationDuration}ms ease-in`,
    // },
    // "& .step-result.step-result-exit-done": {
    //   left: '150%',
    //   opacity: 0,
    //   transition: `all ${animationDuration}ms ease-in`,
    // },
    ...cssAnimationHelper("step-result",
      {
        opacity: 0,
        top: 0,
        transform: "translateY(-100%) translateX(-50%)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      {
        opacity: 1,
        top: "50%",
        transform: "translateY(-50%) translateX(-50%)",
        transition: `all ${animationDuration}ms ease-in`,
      },
      false
    ),
  },
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

export default function Remember_Id_Step3({ study, actionChangeStep }) {
  const classes = useStyles();
  const { vocas } = study;
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
  return <React.Fragment>
    <Instruction_Step3 />
    <BodyTop>
      <BodyMaxWidth>
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
                      actionChangeStep(4);
                    }

                  }}
                  style={{ marginTop: theme.spacing(4) }} >
                  {result.isTrue ? "Next" : "Thử lại"}
                </Button>
              </div>
            </div>
          </CSSTransition>
          {/* bg div */}
          <BgColorOpacity isActive={result.isChecked} color={'rgba(255, 255, 255, 0.8)'} opacity={1} />
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
      </BodyMaxWidth>
    </BodyTop>
  </React.Fragment>
}