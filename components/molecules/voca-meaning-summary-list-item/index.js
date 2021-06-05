import { Typography } from "@material-ui/core";
import ListItemOutline from "components/atoms/list-item-outline";

export default function VocaMeaningSummaryListItem({ onClick, voca }) {
  return <ListItemOutline
    key={voca.id}
    onClick={() => onClick && onClick()}
    styles={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
  >
    <Typography
      variant="subtitle1"
      style={{ fontWeight: "lighter" }}
      color="textSecondary"
    >
      {voca.voca}
    </Typography>
    <Typography
      style={{ textTransform: "none" }}
      variant="subtitle1"
      color="textSecondary"
    >
      {voca.meaning}
    </Typography>
  </ListItemOutline>
}