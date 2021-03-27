import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

function PageTitle(props) {
  const classes = useStyles();
  return (
    <div className={classes.pageTitle}>
      <Typography variant="h5">{props.children}</Typography>
    </div>
  );
}

export default PageTitle;
