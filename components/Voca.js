import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
const useStyles = makeStyles((theme) => {
  return {
    vocaComponent: {
      width: "100%",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        width: `calc(50% - ${theme.spacing(2)}px)`,
      },
      display: "flex",
      flexWrap: "nowrap",
      [theme.breakpoints.down("xs")]: {
        flexWrap: "wrap",
      },
    },
    actionVoca: {
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: theme.spacing(1),
      },
    },
    voca: {
      width: "100%",
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
      backgroundColor: theme.palette.secondary.light,
    },
  };
});

function Voca(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const isExample = props.isExample;
  // UI INTERACT:
  const handleOnToggleExpaned = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={classes.vocaComponent}>
      <Card className={classes.voca} variant="outlined">
        <CardContent>
          <TextField
            className={classes.oneField}
            id="vocabulary"
            label="Vocabulary"
            type="text"
            color="primary"
            multiline={true}
            required
          />
          <TextField
            className={classes.oneField}
            id="meaning"
            label="Meaning"
            type="text"
            color="primary"
            multiline={true}
            required
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
              color="primary"
              multiline={true}
            />
            <TextField
              className={classes.oneField}
              id="ex-sentence"
              label="Example Sentence"
              type="text"
              color="primary"
              multiline={true}
            />
          </CardContent>
        </Collapse>
      </Card>
      {!isExample && (
        <ButtonGroup
          className={classes.actionVoca}
          size="small"
          aria-label="small button group"
        >
          <Tooltip title="Save" placement="left-start">
            <Button variant="text">
              <SaveOutlinedIcon color="primary" />
            </Button>
          </Tooltip>
          <Tooltip title="Cancle" placement="left-start">
            <Button variant="text">
              <CancelOutlinedIcon color="error" />
            </Button>
          </Tooltip>
          {/* <Tooltip title="Edit" placement="left-start">
          <Button variant="text">
            <EditOutlinedIcon color="primary" />
          </Button>
        </Tooltip> */}
        </ButtonGroup>
      )}
    </div>
  );
}

export default Voca;
