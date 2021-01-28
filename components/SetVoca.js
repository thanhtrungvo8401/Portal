import PropType from "prop-types";
import { constantApp } from "../utils/Constant";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { formatDate } from "../utils/DateHelper";

const useStyles = makeStyles((theme) => {
  return {
    setItem: {
      justifyContent: "space-between",
      "& .MuiButton-label": {
        flexWrap: "wrap",
        textAlign: "left",
      },
    },
    setName: {
      display: "block",
      width: "100%",
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
    <Button
      fullWidth={true}
      className={classes.setItem}
      variant="contained"
      color="secondary"
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
  );
}

export default SetVoca;

SetVoca.propsType = {
  name: PropType.string.isRequired,
  number: PropType.number.isRequired,
  time: PropType.object.isRequired,
};
