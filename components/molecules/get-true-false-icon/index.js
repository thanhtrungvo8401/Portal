import { makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    "& .icon": {
      fontSize: "1rem",
    },
    "& .mr-1": {
      marginRight: theme.spacing(1)
    },
    "& .ml-1": {
      marginLeft: theme.spacing(1)
    },
    "& .true": {
      color: theme.palette.success.main
    },
    "& .false": {
      color: theme.palette.error.main
    }
  }
}))

export default function GetTrueFalseIcon({ status, ml, mr }) {
  const classes = useStyles();
  const cssClass = (ml && "ml-1") || (mr && 'mr-1');
  return <div className={classes.root} >
    {status
      ? <CheckIcon className={`icon true ${cssClass}`} />
      : <CloseIcon className={`icon false ${cssClass}`} />
    }
  </div>
}