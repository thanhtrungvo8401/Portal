import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { validForm } from "./InputGroup";
import { Alert } from "@material-ui/lab";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { useDispatch, useSelector } from "react-redux";
import {
  actionResetVocaListEditing,
  actionSetVocabularyEditing,
  actionSetVocabularyObject,
  actionSetVocaListEditingItem,
} from "../redux/actions/vocaActions";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

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
      backgroundColor: theme.palette.primary.main,
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
      borderColor: theme.palette.secondary.main,
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
      "& .MuiIconButton-label": {
        transform: "rotate(180deg)",
      },
    },
    expand: {
      "& .MuiIconButton-label": {
        transform: "rotate(0)",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    collapseItem: {
      backgroundColor: theme.palette.primary.dark,
    },
    mt: {
      marginTop: theme.spacing(1),
    },
    readOnlyField: {
      "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-multiline.MuiInput-multiline": {
        display: "none",
      },
    },
  };
});

// const inputFields = ["voca", "meaning", "kanji", "sentence"];
const inputLabels = {
  voca: "Vocabulary",
  meaning: "Meaning",
  note: "(1) Pronouce!",
  sentence: "(2) Sentences",
};
const inputRequired = ["voca", "meaning"];
const inputNotRequired = ["note", "sentence"];
function Voca(props) {
  const classes = useStyles();
  const [openConfirm, setOpenConfirm] = useState(false);
  const { isEditing, isExample, voca, ERROR } = props;

  const dispatch = useDispatch();
  // Default editing and expand only for create-voca
  const [expanded, setExpanded] = useState(isEditing);
  const vocaEditing = useSelector((state) => state.vocas).vocaEditing;
  const [INTERACT, setINTERACT] = useState({});

  const object = Boolean(vocaEditing.id && isEditing) ? vocaEditing : voca;
  const isValidForm = validForm(object, inputRequired, ERROR);
  // FOR UPDATE VOCA:
  const handleSelectEditingVoca = () => {
    dispatch(actionSetVocabularyEditing(voca));
  };
  const handleResetEditingVoca = () => {
    dispatch(actionSetVocabularyEditing({}));
  };

  // UI INTERACT:
  const handleOnClickSaveBtn = () => {
    if (props.handleOnSubmit) {
      props.handleOnSubmit();
    }
  };
  const handleOnClickCancleBtn = (e) => {
    // reset editing voca
    handleResetEditingVoca();
    // reset creating voca
    dispatch(actionSetVocabularyObject({}));
    // close all editing
    dispatch(actionResetVocaListEditing());
    setExpanded(false);
  };
  const handleOnClickEditBtn = () => {
    handleSelectEditingVoca();
    dispatch(actionSetVocaListEditingItem(voca.id));
    setExpanded(true);
  };
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
  // FUNCTION DEFINE:
  const handleOpenConfirmRemoveVoca = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirmRemoveVoca = () => {
    setOpenConfirm(false);
  };
  const handleRemoveVoca = () => {
    if (props.handleOnRemoveVocaById) {
      props.handleOnRemoveVocaById(voca && voca.id);
    }
    handleCloseConfirmRemoveVoca();
  };

  return (
    <div className={classes.vocaComponent}>
      <Card
        className={`${classes.voca} ${isEditing ? classes.editingVoca : ""}`}
        variant="outlined"
      >
        <CardContent>
          {inputRequired.map((key, index) => {
            const value = object[key] || "";
            const isShowRequiredMsg =
              Boolean(!object[key]) &&
              Boolean(INTERACT[key]) &&
              inputRequired.includes(key);
            const ERR_MSG_CODE = Boolean(INTERACT[key] && ERROR[key]);
            return (
              <div key={key + index} className={classes.oneField}>
                <TextField
                  id={key}
                  label={inputLabels[key]}
                  type="text"
                  color="secondary"
                  multiline={true}
                  required
                  name={key}
                  value={value}
                  onChange={handleOnChange}
                  disabled={!isEditing}
                  className={`${isEditing ? "" : classes.readOnlyField}`}
                />
                {!isEditing && (
                  <Typography variant="body1" color="textPrimary">
                    {value}
                  </Typography>
                )}
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
            <ExpandMoreIcon color="secondary" />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" className={classes.collapseItem}>
          <CardContent>
            {inputNotRequired.map((key, index) => {
              const value = isEditing
                ? object[key] || ""
                : object[key] || "No Data";
              return (
                <div key={key + index} className={classes.oneField}>
                  <TextField
                    className={classes.oneField}
                    id={key}
                    label={inputLabels[key]}
                    type="text"
                    color="secondary"
                    multiline={true}
                    name={key}
                    value={value}
                    onChange={handleOnChange}
                    disabled={!isEditing}
                    className={`${isEditing ? "" : classes.readOnlyField}`}
                  />
                  {!isEditing && <Typography>{value}</Typography>}
                </div>
              );
            })}
            {!isExample && (
              <React.Fragment>
                <Typography className={classes.mt} variant="caption">
                  (1) You can empty the pronouce line if you are sure about the
                  pronunciation
                </Typography>
                <Typography variant="caption">
                  (2) I highly recommend that you should make sentences with
                  Vocabularies to remember it longer.!
                </Typography>
              </React.Fragment>
            )}
          </CardContent>
        </Collapse>
      </Card>
      {!isExample && (
        <ButtonGroup
          className={classes.actionVoca}
          size="small"
          aria-label="small button group"
        >
          {isValidForm && isEditing && (
            <Tooltip title="Save" placement="left-start">
              <Button variant="text" onClick={handleOnClickSaveBtn}>
                <SaveOutlinedIcon color="secondary" />
              </Button>
            </Tooltip>
          )}
          {isEditing && (
            <Tooltip title="Cancle" placement="left-start">
              <Button variant="text" onClick={handleOnClickCancleBtn}>
                <CancelOutlinedIcon color="error" />
              </Button>
            </Tooltip>
          )}
          {!isEditing && (
            <Tooltip title="Edit" placement="left-start">
              <Button variant="text" onClick={handleOnClickEditBtn}>
                <EditOutlinedIcon color="secondary" />
              </Button>
            </Tooltip>
          )}
          {!isEditing && (
            <Tooltip title="Delete" placement="left-start">
              <Button variant="text" onClick={handleOpenConfirmRemoveVoca}>
                <DeleteOutlinedIcon color="secondary" />
              </Button>
            </Tooltip>
          )}
        </ButtonGroup>
      )}
      {/* Confirm Action Popup */}
      <Dialog
        open={openConfirm}
        aria-labelledby="form-dialog-title"
        onClose={handleCloseConfirmRemoveVoca}
      >
        <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>Are you sure want to remove this voca!</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmRemoveVoca}>Cancel</Button>
          <Button onClick={handleRemoveVoca}>
            <Typography color="error" variant="button">
              Remove
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Voca;
