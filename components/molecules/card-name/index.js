import { Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import { formatDate } from "utils/DateHelper";

const useStyles = (props) => makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      marginBottom: theme.spacing(2),
      overflow: "hidden",
      position: "relative",
      [theme.breakpoints.up("sm")]: {
        width: "calc(50% - 0.5rem)",
      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(33% - 0.5rem)",
      },
      cursor: props.onClick ? "pointer" : ""
    },
    cardContent: {
      position: "absolute",
      width: "100%",
      top: 0,
      left: 0,
      zIndex: 1,
      "& .main-title": {
        padding: '1rem',
        backgroundColor: theme.palette.primary.main,
        color: "white",
        width: "calc(100% + 2rem)",
        transform: 'translate(-1rem, -1rem)',
        overflow: "hidden",
        // whiteSpace: 'nowrap'
      }
    },
    cardActions: {
      display: "flex",
      justifyContent: "flex-end",
      paddingTop: "60%",
      [theme.breakpoints.up("md")]: {
        paddingTop: "50%",
      },
      position: "relative",
      zIndex: 1
    },
    bg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 0,
      opacity: 0.6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
  };
});
/**
 * @param object {name, total, date}
 * @param bgImage '/url/...
 * @param action HtmlDom
 */
export default function CardName({ actions, object = {}, bgImage, onClick }) {
  const classes = useStyles({ onClick, bgImage })();
  return <Card className={classes.root} variant="elevation" onClick={() => onClick && onClick()}>
    <CardContent className={classes.cardContent} >
      <Typography variant="h5" component="h2" className="main-title" >
        {object.name}
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          color="textSecondary"
          gutterBottom
        >
          Total: {object.total}
        </Typography>
        <Typography
          color="textSecondary"
          gutterBottom
        >
          {formatDate(object.date)}
        </Typography>
      </div>
    </CardContent>
    <CardActions className={classes.cardActions} >
      {actions}
    </CardActions>
    <div className={classes.bg}>
      <img alt="icon" src={bgImage} />
    </div>
  </Card>
}