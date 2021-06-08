import { IconButton, makeStyles, Typography } from "@material-ui/core";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import theme from "components/theme";
import React from "react";
import { jpConverter } from "utils/kanjiConverter";
const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    paddingBottom: theme.spacing(2),
    "& .hiragana": {
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translate(-50%, -70%)",
    }
  }
}))
export default function TranslateVocaDisplay({ variant = "", voca }) {
  const [translate, setTranlate] = React.useState('');
  const [isTran, setIsTran] = React.useState(false);

  React.useEffect(() => {
    setTranlate('');
    setIsTran(false);
  }, [voca]);

  React.useEffect(() => {
    if (isTran) {
      if (!translate) {
        jpConverter(voca)
          .then(res => setTranlate(res))
          .catch(err => console.log(err))
      }
    }
  }, [isTran]);

  const classes = useStyles();
  return <div className={classes.root} >
    <Typography className="voca" variant={variant} color="textSecondary" >
      {voca}
    </Typography>
    {isTran &&
      <Typography
        className="hiragana"
        style={{ cursor: "pointer", whiteSpace: 'nowrap' }}
        onClick={() => setIsTran(!isTran)}
      >
        {translate}
      </Typography>
    }

    {!isTran &&
      <IconButton className="hiragana" onClick={() => setIsTran(!isTran)} >
        <GTranslateIcon style={{ color: theme.palette.text.secondary, fontSize: "1rem" }} />
      </IconButton>
    }
  </div>
}