import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import InputGroup from "../../components/InputGroup";
import { CREATE_REMEMBER_TYPE } from "../../utils/Constant";

const totalStepWhenUsingDefaultCenterVocas = 5;
const totalStepWhenUsingYourVocas = 3;

const step1Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: theme.palette.info.light,
    width: `calc(50% - 0.5rem)`,
    "&.active": {
      backgroundColor: theme.palette.info.main,
      transition: theme.transitions.create("all", {
        duration: theme.transitions.duration.short,
      }),
    },
  },
  text: {
    color: theme.palette.white.main,
    textAlign: "center",
  },
}));
export default function Step1({ object, actionUpdate }) {
  const classes = step1Styles();
  const ERROR = useSelector((state) => state.error);
  const activeItem = (type) => {
    return object.type === type ? "active" : "";
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    actionUpdate({
      ...object,
      [name]: value,
      isValidStep: Boolean(value),
    });
  };
  return (
    <div className={classes.root}>
      <InputGroup
        object={object}
        inputFields={["name"]}
        inputTypes={{ name: "input" }}
        inputLabels={{ name: "Tu vung bai XX - phan X" }}
        inputRequired={["name"]}
        ERROR={ERROR}
        isUsedInModal={true}
        handleOnChange={handleOnChange}
      />
      <Card
        onClick={() =>
          actionUpdate({
            ...object,
            type: CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET,
            totalStep: totalStepWhenUsingDefaultCenterVocas,
          })
        }
        className={`${classes.card} ${activeItem(
          CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET
        )}`}
      >
        <CardContent>
          <Typography variant="subtitle2" className={`${classes.text}`}>
            Từ vựng được tạo sẵn
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
          <Typography variant="subtitle2" className={classes.text}>
            Từ vựng của chính bạn
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
