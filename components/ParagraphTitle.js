import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paragraphTitle: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  typo: {
    fontWeight: "400",
  },
}));

function ParagraphTitle({ children, hidden }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.paragraphTitle}>
      <Typography
        className={classes.typo}
        variant="h6"
        component="h2"
        color="textSecondary"
      >
        {children}
      </Typography>
    </div>
  );
}

export default ParagraphTitle;
