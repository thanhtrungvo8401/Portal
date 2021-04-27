import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  Step2StudyUI: {
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
  },
}));

export default function Step2StudyUI({ study }) {
  const list = [...study.vocas];
  const listDone = [];
  const classes = useStyles();

  return (
    <div className={classes.Step2StudyUI}>
      <Container>
        List Items
        <ul>
          {study.vocas.map((el) => (
            <li key={el.id}>{el.voca}</li>
          ))}
        </ul>
      </Container>
      
    </div>
  );
}

function CoverVoca(voca) {
  return (
    <div>
      <h1>COVER VOCA</h1>
    </div>
  );
}
