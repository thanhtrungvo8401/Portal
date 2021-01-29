import PropType from "prop-types";
import { constantApp } from "../utils/Constant";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { formatDate } from "../utils/DateHelper";

const useStyles = makeStyles((theme) => {
  return {
    setItem: {
      border: `${theme.palette.secondary.main} 1px solid`,
      marginBottom: theme.spacing(2),
      "& .MuiCardContent-root": {
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
        padding: "8px 16px",
        cursor: "pointer",
        alignItems: "center",
        backgroundColor: theme.palette.primary.light,
        transition: theme.transitions.create("all", {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    setName: {
      display: "block",
      width: "100%",
      textTransform: "uppercase",
      [theme.breakpoints.up("sm")]: {
        display: "inline",
        width: "auto",
      },
    },
  };
});
function SetVoca(props) {
  const classes = useStyles();
  const { name, number, time } = props;

  return (
    <Card variant="outlined" className={classes.setItem}>
      <CardContent>
        <Typography
          className={classes.setName}
          color="secondary"
          variant="subtitle1"
        >
          {name}
        </Typography>
        <Typography color="secondary" variant="subtitle2">
          {`${number}/${constantApp.setVocaLimit}`}
        </Typography>
        <Typography color="secondary" variant="caption">
          {formatDate(time)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SetVoca;

SetVoca.propsType = {
  name: PropType.string.isRequired,
  number: PropType.number.isRequired,
  time: PropType.object.isRequired,
};
