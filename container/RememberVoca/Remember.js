import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import theme from "../../components/theme";
import {
  actionSetIshowUpdateModal,
  actionSetRememberGroup,
  actionSetIsStudy,
} from "../../redux/actions/rememberGroupAction";
import { formatDate } from "../../utils/DateHelper";
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
export default function Remember({ remember = {}, actionDelete }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const total = remember.vocaCodes.split(",").length;
  const date = formatDate(remember.createdDate);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.miniText}
          color="textSecondary"
          gutterBottom
        >
          Remember-group
        </Typography>
        <Typography variant="h5" component="h2">
          {remember.name}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            className={classes.miniText}
            color="textSecondary"
            gutterBottom
          >
            Total: {total}
          </Typography>
          <Typography
            className={classes.miniText}
            color="textSecondary"
            gutterBottom
          >
            {date}
          </Typography>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button
          onClick={() => {
            dispatch(actionSetRememberGroup(remember));
            dispatch(actionSetIshowUpdateModal(true));
          }}
        >
          Edit
        </Button>
        <Button
          color="primary"
          onClick={() => {
            // Important note: => always dispatch(REMEMBER) before dispatch(IS_STUDY);
            dispatch(actionSetRememberGroup(remember));
            dispatch(actionSetIsStudy(true));
          }}
        >
          Study now
        </Button>
        <Button
          onClick={() => actionDelete(remember.id)}
          style={{ color: theme.palette.error.main }}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
