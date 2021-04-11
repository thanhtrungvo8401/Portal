import PropType from "prop-types";
import { constantApp } from "../utils/Constant";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  MenuItem,
  Typography,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { formatDate } from "../utils/DateHelper";
import { appUrl } from "../utils/APP_URL";
import { navigate } from "../utils/Helper";
import React, { useState } from "react";
import InputGroup, { validForm } from "./InputGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  actionResetListEding,
  actionSetValueForSetVocaEditing,
} from "../redux/actions/setVocasActions";

const useStyles = makeStyles((theme) => {
  return {
    btnGroup: {
      width: "100%",
      marginBottom: theme.spacing(1),
      position: "relative",
    },
    setItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      padding: "5px 15px",
      "& .MuiButton-label": {
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
      },
      textTransform: "none!important",
    },
    setName: {
      display: "block",
      width: "100%",
      textAlign: "left",
      textTransform: "uppercase",
      [theme.breakpoints.up("sm")]: {
        display: "inline",
        width: "calc(100% - 8rem)",
      },
    },
    editingGroup: {
      display: "block",
      alignItems: "center",
      textAlign: "center",
      "& form": {
        marginTop: "0px",
      },
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        textAlign: "center",
      },
    },
    menuSetting: {
      "& ul.MuiList-root.MuiMenu-list.MuiList-padding": {
        backgroundColor: theme.palette.info.light,
      },
    },
  };
});
const inputFields = ["setName"];
const inputTypes = {
  setName: "input",
};
const inputLabels = {
  setName: "Lesson XX: X X X X",
};
const inputRequired = ["setName"];
function SetVoca(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const {
    item,
    name,
    number,
    time,
    isExample,
    isEditing,
    ERROR,
    handleOnChangeEditing,
    handleOnSubmitUpdateVoca,
  } = props;
  const setVocaEditing = useSelector((state) => state.setVocas).setVocaEditing;
  const isValidForm = validForm(setVocaEditing, inputRequired, ERROR);
  // UI INTERACT:
  const handleGoToSetVocas = (item) => {
    navigate(appUrl.setVocaDetail(item.id));
  };
  const handleOpenAction = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
  };
  const handleEditBtnClick = () => {
    props.handleOnAllowEditSetVoca(item);
    handleCloseAction();
  };
  const handleRemoveBtnClick = () => {
    handleOnOpenConfirm();
  };
  const handleOnOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleOnCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOnRemoveItemConfirm = () => {
    props.handleOnRemoveItem(item);
    handleCloseAction();
    handleOnCloseConfirm();
  };
  const handleOnCancleBtnClick = () => {
    dispatch(actionResetListEding());
    dispatch(actionSetValueForSetVocaEditing({}));
  };
  const handleOnSaveBtnClick = (e) => {
    e.preventDefault();
    handleOnSubmitUpdateVoca();
  };
  return (
    <React.Fragment>
      {isEditing && (
        <div className={classes.editingGroup}>
          <InputGroup
            ERROR={ERROR}
            inputFields={inputFields}
            inputTypes={inputTypes}
            inputLabels={inputLabels}
            inputRequired={inputRequired}
            object={setVocaEditing}
            handleOnChange={handleOnChangeEditing}
            handleOnSubmit={handleOnSaveBtnClick}
          />
          <ButtonGroup className={classes.btnGroupEditing}>
            {isValidForm && (
              <Button variant="text" onClick={handleOnSaveBtnClick}>
                <SaveOutlinedIcon color="secondary" />
                Save
              </Button>
            )}
            <Button variant="text" onClick={handleOnCancleBtnClick}>
              <CancelOutlinedIcon color="error" />
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      )}
      {!isEditing && (
        <div className={classes.btnGroup}>
          <Button
            variant="outlined"
            className={classes.setItem}
            onClick={() => handleGoToSetVocas(item)}
            style={{
              textTransform: "none!important",
            }}
          >
            <Typography
              className={classes.setName}
              color="textPrimary"
              variant="subtitle1"
              style={{ textTransform: "none" }}
            >
              {name}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {`${number}/${constantApp.setVocaLimit}`}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              {formatDate(time)}
            </Typography>
          </Button>
          {!isExample && (
            <IconButton
              style={{
                position: "absolute",
                left: "100%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              size="medium"
              color="secondary"
              onClick={handleOpenAction}
            >
              <SettingsIcon />
            </IconButton>
          )}
        </div>
      )}
      {/* Action Popup */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseAction}
        className={classes.menuSetting}
      >
        <MenuItem key={"edit"} onClick={() => handleEditBtnClick()}>
          <EditOutlinedIcon
            color="secondary"
            style={{ marginRight: "0.5rem" }}
          />
          Edit
        </MenuItem>
        <MenuItem key={"delete"} onClick={handleRemoveBtnClick}>
          <DeleteOutlinedIcon color="error" style={{ marginRight: "0.5rem" }} />
          Remove
        </MenuItem>
      </Menu>
      {/* Confirm Action Popup */}
      <Dialog
        open={openConfirm}
        onClose={handleOnCloseConfirm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText color="error">
            If you remove this SetVoca, all the vocabularies of this Set will be
            deleted too.!!
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleOnCloseConfirm} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={handleOnRemoveItemConfirm}
              variant="contained"
              color="primary"
            >
              <Typography color="error" variant="button">
                Remove
              </Typography>
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default SetVoca;

SetVoca.propsType = {
  name: PropType.string.isRequired,
  number: PropType.number.isRequired,
  time: PropType.object.isRequired,
  item: PropType.object.isRequired,
};
