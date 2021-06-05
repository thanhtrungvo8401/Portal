import { makeStyles, Typography } from "@material-ui/core"
// import Image from "next/image";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBottom: theme.spacing(2)
  },
  text: {
    width: '100%',
    textIndent: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      width: "calc(50% - 1rem)"
    },
    "& .text-item": {
      marginBottom: theme.spacing(1)
    }
  },
  image: {
    width: "100%",
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      width: "calc(50% - 1rem)"
    },
    "& img": {
      width: "100%",
      height: "100%"
    }
  }
}))

export default function InstructionItem({ text, imageUrl, alt, textBold }) {
  const textArr = text && text.split('\n') || [];
  const classes = useStyles();
  return <div className={classes.root} >
    <div className={classes.text} >
      {textArr.map((el, index) => {
        const textDisplay = index === 0 ? el.substring(textBold.length, el.length) : el;
        return <Typography key={index} color="textSecondary" variant="body1" className="text-item">
          {index === 0 ? <span style={{ fontWeight: "bolder" }} >{textBold}</span> : ''}{textDisplay}
        </Typography>
      })}
    </div>
    <div className={classes.image}>
      <img src={imageUrl} alt={alt || "Picture"} />
    </div>
  </div>
}