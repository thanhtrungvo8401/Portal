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
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { formatDate } from "../utils/DateHelper";
import { appUrl } from "../utils/APP_URL";
import { navigate } from "../utils/Helper";
import React, { useState } from "react";

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
  };
});
function SetVoca(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { item, name, number, time, isExample } = props;
  // UI INTERACT:
  const handleGoToSetVocas = (setVoca) => {
    navigate(appUrl.setVocaDetail("1234"));
  };
  const handleOpenAction = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
  };
  const handleEditBtnClick = () => {
    props.handleOnEditItem(item);
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
  return (
    <React.Fragment>
      <ButtonGroup className={classes.btnGroup}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.setItem}
          onClick={handleGoToSetVocas}
        >
          <Typography
            className={classes.setName}
            color="textPrimary"
            variant="subtitle1"
          >
            {name}
          </Typography>
          <Typography color="textPrimary" variant="subtitle2">
            {`${number}/${constantApp.setVocaLimit}`}
          </Typography>
          <Typography color="textPrimary" variant="caption">
            {formatDate(time)}
          </Typography>
        </Button>
        {!isExample && (
          <Button variant="outlined" size="small" onClick={handleOpenAction}>
            <ArrowDropDownIcon />
          </Button>
        )}
      </ButtonGroup>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseAction}
      >
        <MenuItem key={"edit"} onClick={() => handleEditBtnClick()}>
          <EditOutlinedIcon />
          <Typography className={classes.marginLeft} variant="caption">
            Edit
          </Typography>
        </MenuItem>
        <MenuItem key={"delete"} onClick={handleRemoveBtnClick}>
          <DeleteOutlinedIcon color="error" />
          <Typography className={classes.marginLeft} variant="caption">
            Remove
          </Typography>
        </MenuItem>
      </Menu>
      <Dialog
        open={openConfirm}
        onClose={handleOnCloseConfirm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you remove this SetVoca, all the vocabularies of this Set will be
            deleted too.!!
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleOnCloseConfirm} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOnRemoveItemConfirm} color="primary">
              Remove
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
