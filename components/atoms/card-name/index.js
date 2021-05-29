import { Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
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
        backgroundColor: props.color,
        color: "white",
        width: "calc(100% + 2rem)",
        transform: 'translate(-1rem, -1rem)',
        overflow: "hidden",
        whiteSpace: 'nowrap'
      }
    },
    cardActions: {
      display: "flex",
      justifyContent: "flex-end",
      paddingTop: "45%",
      position: "relative",
      zIndex: 1
    },
    bgText: {
      position: "absolute",
      width: "100%",
      top: '50%',
      transform: "translateY(-50%)",
      zIndex: 0,
      fontSize: "7rem",
      opacity: 0.2,
      textAlign: "center",
      color: props.color,
      userSelect: 'none'
    }
  };
});
export default function CardName({ actions, object = {}, bgText = { content: "", color: "" }, onClick }) {
  const classes = useStyles({ ...bgText, onClick })();
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
          {object.date}
        </Typography>
      </div>
    </CardContent>
    <CardActions className={classes.cardActions} >
      {actions}
    </CardActions>
    <div className={classes.bgText} >{bgText.content}</div>
  </Card>
}