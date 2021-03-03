import PropType from "prop-types";
import { constantApp } from "../utils/Constant";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { formatDate } from "../utils/DateHelper";
import { appUrl } from "../utils/APP_URL";
import { navigate } from "../utils/Helper";

const useStyles = makeStyles((theme) => {
  return {
    setItem: {
      width: "100%",
      "& .MuiButton-label": {
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
      },
      marginBottom: theme.spacing(1),
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
  };
});
function SetVoca(props) {
  const classes = useStyles();
  const { name, number, time } = props;
  // UI INTERACT:
  const handleGoToSetVocas = (setVoca) => {
    navigate(appUrl.setVocaDetail("1234"));
  };
  return (
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
  );
}

export default SetVoca;

SetVoca.propsType = {
  name: PropType.string.isRequired,
  number: PropType.number.isRequired,
  time: PropType.object.isRequired,
};
