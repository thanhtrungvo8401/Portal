import { makeStyles, Typography } from "@material-ui/core";
import { CREATE_REMEMBER_TYPE } from "../../utils/Constant";

const step2Styles = makeStyles((theme) => ({
  root: {},
}));

export default function Step3({ object, actionUpdate }) {
  const { type, level } = object;
  const isDefaultCenter = type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  const classes = step2Styles();
  return (
    <div className={classes.root}>
      {!isDefaultCenter && (
        <Typography>These word will be added into your group!</Typography>
      )}
      {isDefaultCenter && (
        <Typography>Please choose one section in level: {level}</Typography>
      )}
    </div>
  );
}
