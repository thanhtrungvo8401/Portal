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
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { yellow } from "@material-ui/core/colors";
import { validForm } from "./InputGroup";
import { Alert } from "@material-ui/lab";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
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
    editingVoca: {
      borderColor: yellow[900],
      borderWidth: "2px",
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

// const inputFields = ["voca", "meaning", "kanji", "sentence"];
const inputLabels = {
  voca: "Vocabulary",
  meaning: "Meaning",
  kanji: "Kanji",
  sentence: "Example Sentence",
};
const inputRequired = ["voca", "meaning"];
const inputNotRequired = ["kanji", "sentence"];
function Voca(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const isExample = props.isExample;
  const { isEditing, voca, ERROR } = props;
  const [INTERACT, setINTERACT] = useState({});
  const isValidForm = validForm(voca, inputRequired, ERROR);
  // UI INTERACT:
  const handleOnToggleExpaned = () => {
    setExpanded(!expanded);
  };
  const handleOnChange = (e) => {
    const { target } = e;
    setINTERACT({
      ...INTERACT,
      [target.name]: true,
    });
    if (props.handleOnChange) {
      props.handleOnChange(e);
    }
  };
  return (
    <div className={classes.vocaComponent}>
      <Card
        className={`${classes.voca} ${isEditing ? classes.editingVoca : ""}`}
        variant="outlined"
      >
        <CardContent>
          {inputRequired.map((key, index) => {
            const value = voca[key] || "";
            const isShowRequiredMsg =
              Boolean(!voca[key]) &&
              Boolean(INTERACT[key]) &&
              inputRequired.includes(key);
            const ERR_MSG_CODE = Boolean(INTERACT[key] && ERROR[key]);
            return (
              <div key={key + index} className={classes.oneField}>
                <TextField
                  id={key}
                  label={inputLabels[key]}
                  type="text"
                  color="primary"
                  multiline={true}
                  required
                  name={key}
                  value={value}
                  onChange={handleOnChange}
                  disabled={!isEditing}
                />
                {isShowRequiredMsg && (
                  <Alert severity="error">
                    {codeToMessages(constCODE.NOT_NULL)}
                  </Alert>
                )}
                {Boolean(ERR_MSG_CODE) && (
                  <Alert severity="error">
                    {codeToMessages(ERR_MSG_CODE, "usedForField")}
                  </Alert>
                )}
              </div>
            );
          })}
        </CardContent>
        <CardActions>
          <IconButton
            onClick={handleOnToggleExpaned}
            className={`${classes.expandCommon} ${
              expanded ? classes.expandOpen : classes.expand
            } `}
          >
            <ExpandMoreIcon color="primary" />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" className={classes.collapseItem}>
          <CardContent>
            {inputNotRequired.map((el, index) => {
              const value = voca[el] || "";
              return (
                <TextField
                  key={index}
                  className={classes.oneField}
                  id={el}
                  label={inputLabels[el]}
                  type="text"
                  color="primary"
                  multiline={true}
                  name={el}
                  value={value}
                  onChange={handleOnChange}
                  disabled={!isEditing}
                />
              );
            })}
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
        </ButtonGroup>
      )}
    </div>
  );
}

export default Voca;
