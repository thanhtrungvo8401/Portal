import TitleBody from "components/atoms/title-body";
import { BodyTop } from "components/atoms/body-wrapper";
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {}
}))

export default function RememberVocasBody() {
  const classes = useStyles();
  return <BodyTop>
    <div className={classes.root}>
      <TitleBody>Nhóm từ vựng sẽ học</TitleBody>
      <div>
        LIST
    </div>
    </div>
  </BodyTop>
}