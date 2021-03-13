import { Container, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paragraphBody: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function ParagraphBody({ children }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paragraphBody}>
      <Container>{children}</Container>
    </Paper>
  );
}
