import { Container, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paragraphBody: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function ParagraphBody({ children, hidden }) {
  const classes = useStyles();
  return (
    <Paper hidden={hidden} className={classes.paragraphBody}>
      <Container>{children}</Container>
    </Paper>
  );
}
