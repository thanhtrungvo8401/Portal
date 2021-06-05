import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import theme from "../theme";

const intersection = (a, b) => a.filter((el) => b.indexOf(el) !== -1);
const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
}));

export default function VocaGroup({
  title,
  items = [],
  getDetail,
  handleToggle,
  activeList = [],
  isActive,
}) {
  const classes = useStyles();
  const numberOfChecked = (items) => intersection(activeList, items).length;

  return (
    <Paper elevation={3} style={{ width: "100%" }}>
      <CardContent className={classes.cardHeader}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption">{`${numberOfChecked(items)}/${
          items.length
        } selected`}</Typography>
      </CardContent>
      <Divider />
      <CardContent
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginBottom: -theme.spacing(1),
        }}
      >
        {items.map((id) => {
          return (
            <Chip
              style={{
                marginBottom: theme.spacing(1),
                cursor: "pointer",
                maxWidth: "100%"
              }}
              onClick={handleToggle(id)}
              label={
                Boolean(getDetail)
                  ? activeList.includes(id)
                    ? `${getDetail(id).voca} (${getDetail(id).meaning})`
                    : getDetail(id).voca
                  : id
              }
              key={id}
              color={
                isActive || activeList.includes(id) ? "primary" : "default"
              }
              avatar={
                <Checkbox
                  size="small"
                  checked={activeList.includes(id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": id }}
                />
              }
            />
          );
        })}
      </CardContent>
    </Paper>
  );
}
