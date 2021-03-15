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
  Tooltip,
} from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { formatDate } from "../utils/DateHelper";
import { appUrl } from "../utils/APP_URL";
import { navigate } from "../utils/Helper";
import React, { useState } from "react";
import InputGroup from "./InputGroup";
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
    },
    setItem: {
      width: "100%",
      "& .MuiButton-label": {
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
      },
    },
    setName: {
      display: "block",
      width: "100%",
      textAlign: "left",
      textTransform: "uppercase",
      [theme.breakpoints.up("sm")]: {
        display: "inline",
        width: "auto",
      },
    },
    marginLeft: {
      marginLeft: theme.spacing(1),
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
    btnGroupEditing: {
      // marginLeft: theme.spacing(1)
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
  } = props;
  const setVocaEditing = useSelector((state) => state.setVocas).setVocaEditing;
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
  const handleOnSaveBtnClick = () => {
    // dispatch(action)
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
            // handleOnSubmit={}
          />
          <ButtonGroup className={classes.btnGroupEditing}>
            <Tooltip title="Save" placement="top">
              <Button variant="text" onClick={handleOnSaveBtnClick}>
                <SaveOutlinedIcon color="secondary" />
              </Button>
            </Tooltip>
            <Tooltip title="Cancle" placement="top">
              <Button variant="text" onClick={handleOnCancleBtnClick}>
                <CancelOutlinedIcon color="error" />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      )}
      {!isEditing && (
        <ButtonGroup variant="text" className={classes.btnGroup}>
          <Button
            className={classes.setItem}
            onClick={() => handleGoToSetVocas(item)}
          >
            <Typography
              className={classes.setName}
              color="textPrimary"
              variant="subtitle1"
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
            <Button size="small" color="secondary" onClick={handleOpenAction}>
              <PlaylistPlayIcon />
            </Button>
          )}
        </ButtonGroup>
      )}
      {/* Action Popup */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseAction}
      >
        <MenuItem key={"edit"} onClick={() => handleEditBtnClick()}>
          <EditOutlinedIcon />
          <Typography
            className={classes.marginLeft}
            variant="caption"
            color="secondary"
          >
            Edit
          </Typography>
        </MenuItem>
        <MenuItem key={"delete"} onClick={handleRemoveBtnClick}>
          <DeleteOutlinedIcon color="error" />
          <Typography
            className={classes.marginLeft}
            variant="caption"
            color="error"
          >
            Remove
          </Typography>
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
