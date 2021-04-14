import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { theme } from "./theme";
import { formatDate } from "../utils/DateHelper";
import { appUrl } from "../utils/APP_URL";
import { navigate } from "../utils/Helper";
import React from "react";
import { useDispatch } from "react-redux";
import {
  actionSetIsShowSetVocaModal,
  actionSet_SetVocaObject,
} from "../redux/actions/setVocasActions";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        width: "calc(50% - 0.5rem)",
      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(33% - 0.5rem)",
      },
    },
    miniText: {
      fontSize: theme.typography.pxToRem(14),
    },
    pos: {
      marginBottom: theme.typography.pxToRem(12),
    },
  };
});
function SetVoca({ setVoca, onSelectSetVocaIdToDelete }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleGoToSetVocas = () => {
    navigate(appUrl.setVocaDetail(setVoca.id));
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent onClick={handleGoToSetVocas} style={{ cursor: "pointer" }}>
        <Typography
          className={classes.miniText}
          color="textSecondary"
          gutterBottom
        >
          A vocabularies group
        </Typography>
        <Typography variant="h5" component="h2">
          {setVoca.setName}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            className={classes.miniText}
            color="textSecondary"
            gutterBottom
          >
            {setVoca.totalVocas}/{setVoca.maxVoca || constantApp.setVocaLimit}
          </Typography>
          <Typography
            className={classes.miniText}
            color="textSecondary"
            gutterBottom
          >
            {formatDate(setVoca.createdDate)}
          </Typography>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button color="secondary">Detail</Button>
        <Button
          style={{ color: theme.palette.success.main }}
          onClick={() => {
            dispatch(actionSet_SetVocaObject({ ...setVoca }));
            dispatch(actionSetIsShowSetVocaModal(true));
          }}
        >
          Edit
        </Button>
        <Button
          style={{ color: theme.palette.error.main }}
          onClick={() => onSelectSetVocaIdToDelete(setVoca.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default SetVoca;
