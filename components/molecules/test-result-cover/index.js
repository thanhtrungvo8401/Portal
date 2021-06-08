import { makeStyles, Typography } from "@material-ui/core"

const useStyles = (medal) => makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& .img-cover": {
      maxWidth: "100%",
      position: "relative",
    },
    "& .number": {
      position: "absolute",
      width: "100%",
      textAlign: "center",
      top: "50%",
      transform: !medal ? "translateY(-50%)" : "translateY(-83%)",
      color: !medal ? theme.palette.text.secondary : theme.palette.primary.main
    },
    "& .plus": {
      position: "absolute",
      top: '0',
      left: "65%",
      fontSize: "1.5rem"
    }
  }
}))

export default function TestResultCover({ number, medal }) {
  const displayNum = Math.round(number);
  return <div className={useStyles(medal)().root} >
    <div className="img-cover" >
      <img
        src={!medal ? '/image/test-result.png' : "/image/medal.png"}
        alt="test-result"
      />
      <Typography
        className='number'
        variant="h3"
      >
        {displayNum}
        {number > displayNum && <div className="plus" >+</div>}
      </Typography>
    </div>
  </div>
}