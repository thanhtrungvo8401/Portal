import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(1),
  },
}));

function PageTitle(props) {
  const classes = useStyles();
  return (
    <div className={classes.pageTitle}>
      <Typography color="primary" variant="h5" component="h1">
        {props.children}
      </Typography>
    </div>
  );
}

export default PageTitle;
