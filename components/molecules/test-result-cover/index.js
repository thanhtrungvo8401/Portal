import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
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
      transform: "translateY(-50%)"
    },
    "& .plus": {
      position: "absolute",
      top: '0',
      left: "65%",
      fontSize: "1.5rem"
    }
  }
}))

export default function TestResultCover({ number }) {
  const displayNum = Math.round(number);
  return <div className={useStyles().root} >
    <div className="img-cover" >
      <img src='/image/test-result.png' alt="test-result" />
      <Typography
        className='number'
        variant="h3"
        color="textSecondary"
      >
        {displayNum}
        {number > displayNum && <div className="plus" >+</div>}
      </Typography>
    </div>
  </div>
}