import { Grid } from "@material-ui/core"
const COLUMN_50 = 6;
const COLUMN_100 = 12;
export default function GridGroupsItem({ items = [] }) {
  return <Grid container spacing={1} >
    {items.map(({ el, isLarge }, index) => {
      const col = isLarge ? COLUMN_100 : COLUMN_50;
      return <Grid item xs={col} key={index}>{el}</Grid>
    })}
  </Grid>
}