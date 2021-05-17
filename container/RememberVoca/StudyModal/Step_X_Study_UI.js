import Board, { moveCard } from "@lourenci/react-kanban";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { styleStep_X_StudyUI } from "./StudyModal";

const initData = {
  columns: [
    {
      id: Date.now().toString() + "_voca",
      cards: [
        {
          id: 1,
          title: "Card title 1",
        },
        {
          id: 2,
          title: "Card title 2",
        },
        {
          id: 3,
          title: "Card title 3",
        }
      ]
    },
    {
      id: Date.now().toString() + "_meaning",
      cards: [
        {
          id: 9,
          title: "Card title 9",
        },
        {
          id: 10,
          title: "Card title 9",
        },
        {
          id: 11,
          title: "Card title 9",
        }
      ]
    }
  ]
};

const useStyles = makeStyles(theme => ({
  Step3StudyUI: styleStep_X_StudyUI
}))

export default function Step_X_StudyUI() {
  const classes = useStyles();
  const [data, setData] = React.useState(initData);

  const handleItemsMove = (_card, source, destination) => {
    const updatedValue = moveCard(data, source, destination);
    setData(updatedValue);
  }
  return <section className={classes.Step3StudyUI} >
    <Board onCardDragEnd={handleItemsMove} disableColumnDrag >
      {data}
    </Board>
  </section>
}