import { makeStyles, Typography } from "@material-ui/core"
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import DividerItem from "components/atoms/devider-item";
import { appUrl } from "utils/APP_URL";
import { navigate } from "utils/Helper";

const useStyles = makeStyles(theme => ({
  root: {},
  congrats: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  vocas: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  endGroup: {
    display: "flex",
    justifyContent: "center"
  },
}))

export default function Remember_Id_Step7({ study }) {
  const classes = useStyles();
  const { vocas } = study;
  return <BodyTop>
    <BodyMaxWidth>
      <div className={classes.congrats} >
        <img src="/image/yay-cat.png" alt='congrats-cat' />
        <Typography
          style={{ width: "100%", textAlign: "center" }}
          color='textSecondary'
          variant='subtitle1'
        >Chúc mừng bạn đã hoàn thành việc ghi nhớ từ vựng</Typography>
      </div>
      <DividerItem />

      {vocas.map((v, i) => {
        return <div className={classes.vocas} >
          <Typography variant="h6" component="div" color="textSecondary">
            {v.voca}
          </Typography>
          <Typography style={{ fontWeight: "lighter" }} variant="h6" component="div" color="textSecondary">
            {v.meaning}
          </Typography>
          {i + 1 !== vocas.length && <DividerItem isHasLine />}
        </div>
      })}
      <DividerItem />
      <div className={classes.endGroup} >
        <img
          src="/image/end-here.png"
          alt='eng-picture'
          style={{ cursor: "pointer" }}
          onClick={() => navigate(appUrl.rememberVoca().url)}
        />
      </div>
    </BodyMaxWidth>
  </BodyTop>
}