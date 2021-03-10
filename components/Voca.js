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
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { yellow } from "@material-ui/core/colors";
import { validForm } from "./InputGroup";
import { Alert } from "@material-ui/lab";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { useDispatch } from "react-redux";
import { actionSetVocabularyObject } from "../redux/actions/vocaActions";
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
      "& .MuiFormControl-root.MuiTextField-root": {
        width: "100%",
      },
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
    mt: {
      marginTop: theme.spacing(1),
    },
  };
});

// const inputFields = ["voca", "meaning", "kanji", "sentence"];
const inputLabels = {
  voca: "Vocabulary",
  meaning: "Meaning",
  note: "(1) How to pronouce!",
  sentence: "(2) Example Sentence",
};
const inputRequired = ["voca", "meaning"];
const inputNotRequired = ["note", "sentence"];
function Voca(props) {
  const classes = useStyles();
  const { isEditing, isCreate, isExample, voca, ERROR } = props;

  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(Boolean(isCreate));
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
  const handleOnSubmit = () => {
    if (props.handleOnSubmit) {
      props.handleOnSubmit();
    }
  };
  const closeCreateForm = (e) => {
    if (props.closeCreateForm) {
      props.closeCreateForm();
    }
  };
  // Life cycle-hook:
  useEffect(() => {
    if (isCreate) {
      dispatch(actionSetVocabularyObject({}));
    }
  }, []);
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
            {!isExample && <React.Fragment>
              <Typography className={classes.mt} variant="caption">
              (1) You can empty the pronouce line if you are sure about the
              pronunciation
            </Typography>
            <Typography variant="caption">
              (2) I highly recommend that you should make sentences with
              Vocabularies to remember it longer.!
            </Typography>
              </React.Fragment>}
          </CardContent>
        </Collapse>
      </Card>
      {!isExample && (
        <ButtonGroup
          className={classes.actionVoca}
          size="small"
          aria-label="small button group"
        >
          {isValidForm && (
            <Tooltip title="Save" placement="left-start">
              <Button variant="text" onClick={handleOnSubmit}>
                <SaveOutlinedIcon color="primary" />
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Cancle" placement="left-start">
            <Button variant="text" onClick={closeCreateForm}>
              <CancelOutlinedIcon color="error" />
            </Button>
          </Tooltip>
        </ButtonGroup>
      )}
    </div>
  );
}

export default Voca;
