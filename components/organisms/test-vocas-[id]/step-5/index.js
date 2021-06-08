import React from "react";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TestResultCover from "components/molecules/test-result-cover";
import TitleBody from "components/atoms/title-body";
import ListExpandItem from "components/molecules/list-expand-items";
import DividerItem from "components/atoms/devider-item";
import { SECONDS_TO_MILISECONDS, TO_PERCENT } from "utils/Constant";
import { makeStyles, Typography } from "@material-ui/core";
import GetTrueFalseIcon from "components/molecules/get-true-false-icon";
import AudioIcon from "components/atoms/audio-icon";
const useStyles = makeStyles(theme => ({
  summaryEl: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailEl: {
    width: "100%",
    "& .one-line": {
      display: "flex",
      justifyContent: 'space-between',
      width: "100%",
      alignItems: "center"
    },
    "& .left-part": {
      width: "5rem",
      width: '3.5rem',
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      fontSize: "1rem"
    }
  },
  flexBox: {
    display: "flex"
  }
}))

const QA_PER_VOCA = 3;

export default function TestGroupStep5({ results, KEY, time = 0, exactNum = 0 }) {
  const total = results.length * QA_PER_VOCA;
  const listFields = [KEY.STEP2, KEY.STEP3, KEY.STEP4];
  const classes = useStyles();

  const getDisplay = type => {
    switch (type) {
      case KEY.STEP2:
        return <AudioIcon small />;
      case KEY.STEP3:
        return "VN";
      case KEY.STEP4:
        return "JP"
      default:
        return null;
    }
  }
  const generateItems = results.map(oneV => {
    return {
      summaryEl: <div className={`${classes.summaryEl}`} >
        <Typography color="textSecondary" >{oneV.voca}</Typography>
        <div className={classes.flexBox} >
          {listFields.map((field, i) => {
            return <GetTrueFalseIcon status={oneV[field].isExact} ml key={i} />
          })}
        </div>
      </div>,
      detailEl: <div className={`${classes.detailEl}`} >
        {listFields.map((field, i) => {
          return <React.Fragment key={i}>
            <div className='one-line' >
              <div className='left-part' color='textSecondary' >
                <GetTrueFalseIcon status={oneV[field].isExact} mr />
                {getDisplay(field)}
              </div>
              <Typography color="textSecondary" >
                {oneV[field]['value']}
              </Typography>
            </div>
            {i !== listFields.length - 1 && <DividerItem isHasLine />}
          </React.Fragment>
        })}
      </div>
    }
  })
  return <React.Fragment>
    <BodyTop>
      <TitleBody>Kết quả kiểm tra của bạn</TitleBody>
      <TestResultCover medal number={exactNum * TO_PERCENT / total} />
      <Typography style={{ textAlign: "center" }} variant="h6">
        Thời gian trung bình {(time / total / SECONDS_TO_MILISECONDS).toFixed(1)} (s)
        </Typography>
    </BodyTop>
    <BodyTop>
      <TitleBody>Xem chi tiết</TitleBody>
      <BodyMaxWidth>
        <ListExpandItem items={generateItems} />
      </BodyMaxWidth>
    </BodyTop>
  </React.Fragment>
}