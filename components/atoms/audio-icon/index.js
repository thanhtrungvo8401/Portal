import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  small: {
    width: "1.75rem"
  }
}))

export default function AudioIcon({ small }) {
  return <img
    className={small ? useStyles().small : ''}
    src="/image/audio.png" alt="audio"
  />
}