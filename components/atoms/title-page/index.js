import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 0
  },
}));

export default function TitlePage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography color="primary" variant="h5" component="h1">
        {props.children}
      </Typography>
    </div>
  );
}