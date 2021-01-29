import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => {
  return {
    voca: {
      maxWidth: "500px",
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.info.main,
      "& .MuiCardContent-root": {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "8px 16px",
      },
      "& .MuiCardActions-root.MuiCardActions-spacing": {
        position: "relative",
      },
    },
    oneField: {
      width: `calc(50% - ${theme.spacing(1)}px)`,
    },
    expandCommon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)!important",
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    collapseItem: {
      backgroundColor: theme.palette.info.dark,
    },
  };
});

function Voca(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  // UI INTERACT:
  const handleOnToggleExpaned = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.voca} variant="outlined">
      <CardContent>
        <TextField
          className={classes.oneField}
          id="vocabulary"
          label="Vocabulary"
          type="text"
          color="secondary"
          multiline={true}
        />
        <TextField
          className={classes.oneField}
          id="meaning"
          label="Meaning"
          type="text"
          color="secondary"
          multiline={true}
        />
      </CardContent>
      <CardActions>
        <IconButton
          onClick={handleOnToggleExpaned}
          className={`${classes.expandCommon} ${
            expanded ? classes.expandOpen : classes.expand
          } `}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" className={classes.collapseItem}>
        <CardContent>
          <TextField
            className={classes.oneField}
            id="kanji"
            label="Kanji"
            type="text"
            color="secondary"
            multiline={true}
          />
          <TextField
            className={classes.oneField}
            id="ex-sentence"
            label="Example Sentence"
            type="text"
            color="secondary"
            multiline={true}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Voca;
