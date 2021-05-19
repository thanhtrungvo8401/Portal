import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DragDropComponent from "../../../components/DragDropComponent";
import theme from "../../../components/theme";
import { styleStep_X_StudyUI } from "./StudyModal";


const useStyles = makeStyles(theme => ({
  Step3StudyUI: styleStep_X_StudyUI,
  OneColumn: {
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
    }
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
  padding: theme.spacing(1)
});

export default function Step_X_StudyUI({ vocas }) {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    if (vocas.length > 0) {
      const listVoca = vocas.map(el => ({ id: el.id + "_voca", content: el.voca }));
      const listMeaning = vocas.map(el => ({ id: el.id + "_meaning", content: el.meaning }));
      const listItems = [...listVoca, ...listMeaning].sort((a, b) => a.content > b.content ? -1 : 1);
      setItems(listItems);
    }
  }, [vocas]);
  return <section className={classes.Step3StudyUI} >
    <Button color="default" style={{ marginBottom: theme.spacing(2) }} >
      <HelpOutlineIcon style={{ fontSize: "2.5rem", marginRight: theme.spacing(1) }} />
      <Typography
        color="textSecondary"
      >
        Click để nghe hướng dẫn
      </Typography>
    </Button>
    <Box className={classes.OneColumn} >
      <DragDropComponent
        items={items}
        actionUpdate={setItems}
        itemsStyle={getItemStyle}
        listStyle={getListStyle}
      />
    </Box>
    <Box component="div" style={{ textAlign: "center", marginTop: theme.spacing(5) }} >
      <Button color="primary" variant="contained" >
        Kiểm tra kết quả
      </Button>
    </Box>
  </section>
}