import { makeStyles } from "@material-ui/core";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import TestVocaBox from "components/organisms/test-vocas/test-vocas-box";

const useStyles = makeStyles(theme => ({
  root: {}
}))

export default function TestVocaBody({ }) {
  const classes = useStyles();
  return <BodyTop>
    <div className={classes.root} >
      <TitleBody>Chỉnh sửa nội dung bài kiểm tra</TitleBody>
      <TestVocaBox />
    </div>
  </BodyTop>
}