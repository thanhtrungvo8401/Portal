import { Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import { constantApp } from "../../../utils/Constant";
import { CSSTransition } from "react-transition-group";
import { Autocomplete } from "@material-ui/lab";

const animationDuration = constantApp.animationDuration;

const useStyles = makeStyles(theme => ({
  root: {
    // Q-A-voca ENTER
    "& .Q-A-voca-enter": {
      opacity: 0,
      transform: "translateX(-100%)",
    },
    "& .Q-A-voca-enter-active, .Q-A-voca-enter-done": {
      opacity: 1,
      transform: "translateX(0)",
      transition: `all ${animationDuration}ms ease-in`,
    },
    //Q-A-voca EXIT
    "& .Q-A-voca-exit": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "& .Q-A-voca-exit-active, .Q-A-voca-exit-done": {
      opacity: 0,
      transform: "translateX(100%)",
      transition: `all ${animationDuration}ms ease-in`,
    },
  },
  cover_root: {
    paddingTop: theme.spacing(1),
    position: "relative",
  },
  voca: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`, marginTop: theme.spacing(2), textAlign: "center",
    "& .text": {
      textAlign: "center"
    }
  },
  meaningTitle: {
    marginTop: theme.spacing(5),
  },
  meaning: {
    "& .MuiFormControl-root.MuiTextField-root": {
      marginTop: theme.spacing(1)
    }
  },
  confirmBtn: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(5)
  }
}));

export default function TestGroupStep2UI({ voca, optionsMeaning }) {
  const classes = useStyles();
  return <section className={classes.root}>
    <div className={classes.cover_root} >
      {/* JP */}
      <CSSTransition classNames="Q-A-voca" in={voca.isIn} timeout={animationDuration} onEntered={() => { }} onExited={() => { }} >
        <Paper elevation={3} className={classes.voca} >
          <Typography className="text" variant="h5" color="primary" >{voca.voca}</Typography>
        </Paper>
      </CSSTransition>
      {/* VN Meaning */}
      <Typography className={classes.meaningTitle} variant="subtitle1" >Có nghĩa là gì ?</Typography>
      <CSSTransition classNames="" in={voca.isIn} timeout={animationDuration} onEntered={() => { }} onExited={() => { }} >
        <Autocomplete className={classes.meaning} id="select-result" freeSolo options={optionsMeaning}
          renderInput={params => (
            <TextField {...params} label="Nghĩa của từ" margin="normal" variant="outlined" />
          )}
          onChange={(e, value, reason) => { }}
          value={""}
        />
      </CSSTransition>
      <div className={classes.confirmBtn}>
        <Button variant="contained" color="primary" >Chốt đáp án</Button>
      </div>
    </div>
  </section>
}