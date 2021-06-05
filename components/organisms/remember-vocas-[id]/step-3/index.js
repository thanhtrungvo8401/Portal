import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";
import DragDropComponent from "components/molecules/drag-drop-component";
import theme from "components/theme";
import Instruction_Step3 from "components/organisms/remember-vocas-[id]/step-3/instruction";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import CatAnnoucement from "components/molecules/cat-announcement";
import { constantApp } from "utils/Constant";


const useStyles = makeStyles(theme => ({
  DragDropCover: {
    position: "relative",
    overflow: "hidden",
    width: '100%',
    "& .react-dnd-element:nth-child(2n + 1)": {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottom: "none!important"
    },
    "& .react-dnd-element:nth-child(2n)": {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      borderTop: "none!important",
      marginBottom: theme.spacing(1),
    },
  }
}))

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: theme.spacing(1),
  fontSize: "1rem",
  lineHeight: "1.5rem",
  transition: `all ${constantApp.animationDuration}ms ease-in`,
  border: !isDragging ? `1px solid ${theme.palette.primary.light}` : `1px solid ${theme.palette.primary.main}`,
  overflow: "hidden",
  width: "100%",
  boxShadow: isDragging ? constantApp.BOXSHADOW : "",
  backgroundColor: isDragging ? constantApp.COLOR.WHITE : "",
  textAlign: "center",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  borderRadius: theme.shape.borderRadius,
  width: "100%",
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
  const onNextOrTryAgainClick = () => {
    if (!result.isTrue) setResult({ isChecked: false, isTrue: false })
    else actionChangeStep(4);
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
      <TitleBody>Kéo thả từ vựng</TitleBody>
      <BodyMaxWidth>
        <Box className={classes.DragDropCover} >
          {/* DragDropComponent */}
          <DragDropComponent
            items={items}
            actionUpdate={setItems}
            itemsStyle={getItemStyle}
            listStyle={getListStyle}
          />
        </Box>

        <CatAnnoucement
          type={result.isTrue ? 1 : 0}
          isActive={result.isChecked}
          actions={<Button color="primary" variant="contained"
            onClick={onNextOrTryAgainClick}>
            {result.isTrue ? "Next" : "Thử lại"}
          </Button>}
        />
        <ActionsBtnGroup center={true} >
          <Button
            color="primary"
            variant="contained"
            onClick={() => checkResult()} >
            Kiểm tra kết quả
          </Button>
        </ActionsBtnGroup>
      </BodyMaxWidth>
    </BodyTop>
  </React.Fragment>
}