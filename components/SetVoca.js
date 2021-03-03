import PropType from "prop-types";
import { constantApp } from "../utils/Constant";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  MenuItem,
  Typography,
  Menu,
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
  const { name, number, time } = props;
  // UI INTERACT:
  const handleGoToSetVocas = (setVoca) => {
    navigate(appUrl.setVocaDetail("1234"));
  };
  const handleOpenAction = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = (event) => {
    setAnchorEl(null);
  };
  const handleEditBtnClick = (event) => {
    handleCloseAction();
  };
  const handleRemoveBtnClick = (event) => {
    handleCloseAction();
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
        <Button variant="outlined" size="small" onClick={handleOpenAction}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseAction}
      >
        <MenuItem key={"edit"} onClick={handleEditBtnClick}>
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
    </React.Fragment>
  );
}

export default SetVoca;

SetVoca.propsType = {
  name: PropType.string.isRequired,
  number: PropType.number.isRequired,
  time: PropType.object.isRequired,
};
