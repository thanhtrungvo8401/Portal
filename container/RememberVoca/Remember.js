import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../components/theme";
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
export default function Remember({ remember = {} }) {
  const classes = useStyles();
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
        <Button>Edit</Button>
        <Button color="primary">Study now</Button>
        <Button style={{ color: theme.palette.error.main }}>Remove</Button>
      </CardActions>
    </Card>
  );
}
