import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: { maxHeight: "18rem", overflowY: "scroll" },
}));
export default function ListVocabularies({ vocas, hidden }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.root}>
      <List>
        {vocas.map((el, index) => (
          <ListItem
            key={el.id}
            button
            divider={index !== vocas.length - 1}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <ListItemText
              secondary={el.voca}
              style={{ width: "calc(50% - 0.5rem)", marginRight: "1rem" }}
            />
            <ListItemText
              secondary={el.meaning}
              style={{ width: "calc(50% - 0.5rem)" }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
