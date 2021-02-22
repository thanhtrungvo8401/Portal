import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    actionGroup: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2)
    },
  };
});

function ActionGroup(props) {
  const classes = useStyles();
  return <div className={classes.actionGroup}>{props.children}</div>;
}

export default ActionGroup;
