import { makeStyles, Typography } from "@material-ui/core";
import { CREATE_REMEMBER_TYPE } from "../../utils/Constant";

const step2Styles = makeStyles((theme) => ({
  root: {},
}));

export default function Step2({ object, actionUpdate }) {
  const isDefaultCenter =
    object.type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  const classes = step2Styles();
  return (
    <div className={classes.root}>
      {!isDefaultCenter && <Typography>From your own vocas </Typography>}
      {isDefaultCenter && <Typography>From default center </Typography>}
    </div>
  );
}
