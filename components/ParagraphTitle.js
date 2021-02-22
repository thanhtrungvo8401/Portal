import { makeStyles, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paragraphTitle: {
    marginBottom: theme.spacing(1),
  },
  typo: {
    display: "inline-block",
    position: "relative",
    "&:after": {
      display: "block",
      position: "absolute",
      width: "100%",
      height: "3px",
      left: "0px",
      bottom: "0px",
      content: "''",
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

function ParagraphTitle(props) {
  const classes = useStyles();
  return (
    <div className={classes.paragraphTitle}>
      <Typography className={classes.typo} variant="h6" color="textPrimary">
        {props.children}
      </Typography>
    </div>
  );
}

export default ParagraphTitle;
