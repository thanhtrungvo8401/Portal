import { Button, ButtonGroup, Container, makeStyles, Typography } from "@material-ui/core";
import { navigate } from "utils/Helper";
import { appUrl } from "utils/APP_URL";
const useStyles = makeStyles(theme => ({
  Step6StudyUI: styleStep_X_StudyUI,
  Top: {
    marginTop: theme.spacing(2),
    position: "relative",
    "& .QAndA-enter": {
      opacity: 0
    },
    "& .QAndA-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .QAndA-enter-done": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .QAndA-exit": {
      opacity: 1
    },
    "& .QAndA-exit-active": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "& .QAndA-exit-done": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    }
  },
  Middle: {
    marginTop: theme.spacing(6),
    position: "relative",
    width: "4rem",
    height: "4rem",
    margin: "0 auto"
  },
  Bottom: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    "&.options-enter": {
      opacity: 0
    },
    "&.options-enter-active": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.options-enter-done": {
      opacity: 1,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.options-exit": {
      opacity: 1
    },
    "&.options-exit-active": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    },
    "&.options-exit-done": {
      opacity: 0,
      transition: `all ${animationDuration}ms ease-in`,
    }
  },
  Summary: {
    textAlign: "center",
    marginTop: theme.spacing(6)
  }
}));

export default function Result({ }) {
  const classes = useStyles();
  return <section className={`${classes.Step6StudyUI}`} >
    <Container className={`${classes.Summary}`}>
      <Typography variant="h6" color="textSecondary" >Kết quả</Typography>
      <Typography variant="h4" color="primary">
        {Number(summary.percent * 100).toFixed(2)} %
    </Typography>

      <Typography
        variant="h6" color="textSecondary"
        style={{ marginTop: theme.spacing(1) }}
      >
        Thời gian trung bình
    </Typography>
      <Typography variant="h4" color="primary">
        {Number(summary.timeAvarage / 1000).toFixed(2)} s/câu
    </Typography>
      <ButtonGroup variant="outlined" color="primary">
        <Button
          onClick={() => navigate(appUrl.rememberVoca().url)}
          style={{ marginTop: theme.spacing(5) }} >
          Kết thúc
    </Button>
        <Button
          onClick={() => alert("Handle later")}
          style={{ marginTop: theme.spacing(5) }} >
          Thử lại
    </Button>
      </ButtonGroup>
    </Container>
  </section >
}