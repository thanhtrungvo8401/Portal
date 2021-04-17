import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { CREATE_REMEMBER_TYPE } from "../../utils/Constant";

const totalStepWhenUsingDefaultCenterVocas = 5;
const totalStepWhenUsingYourVocas = 3;

const step1Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  card: {
    backgroundColor: theme.palette.info.light,
    "&.active": {
      backgroundColor: theme.palette.info.main,
      transition: theme.transitions.create("all", {
        duration: theme.transitions.duration.short,
      }),
    },
  },
  leftCard: {
    marginRight: theme.spacing(2),
  },
  text: {
    color: theme.palette.white.main,
  },
}));
export default function Step1({ object, actionUpdate }) {
  const classes = step1Styles();
  const activeItem = (type) => {
    return object.type === type ? "active" : "";
  };
  return (
    <div className={classes.root}>
      <Card
        onClick={() =>
          actionUpdate({
            ...object,
            type: CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET,
            totalStep: totalStepWhenUsingDefaultCenterVocas,
          })
        }
        className={`${classes.card} ${classes.leftCard} ${activeItem(
          CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET
        )}`}
      >
        <CardContent>
          <Typography className={`${classes.text}`}>
            Default Vocabularies
          </Typography>
        </CardContent>
      </Card>
      <Card
        onClick={() =>
          actionUpdate({
            ...object,
            type: CREATE_REMEMBER_TYPE.TYPE_OWN_SET,
            totalStep: totalStepWhenUsingYourVocas,
          })
        }
        className={`${classes.card} ${activeItem(
          CREATE_REMEMBER_TYPE.TYPE_OWN_SET
        )}`}
      >
        <CardContent>
          <Typography className={classes.text}>Your Vocabularies</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
