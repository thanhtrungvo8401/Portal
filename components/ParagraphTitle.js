import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paragraphTitle: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  typo: {
    fontWeight: "400"
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
