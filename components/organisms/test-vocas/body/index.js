import React from "react";
import { Avatar, Box, Button, Card, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { LEVEL, storageKey } from "utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { actionSetIsShowModal } from "redux/actions/testVocaActions";
import { serviceGetSetVocas } from "service/setVocaService";
import { serviceGetTestVocaByOwnerId } from "service/testVocaService";
import { localStorageHelper } from "utils/storageHelper";
import { navigate } from "utils/Helper";
import { appUrl } from "utils/APP_URL";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import DividerItem from "components/atoms/devider-item";
import TitleBody from "components/atoms/title-body";
import { BodyTop } from "components/atoms/body-wrapper";


const destopWidth = "10rem";

const useStyles = makeStyles(theme => ({
  Card: {
    margin: '0 auto',
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexWrap: "wrap",
  },
  LeftPart: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: destopWidth,
    },
    "& .left-title": {
      width: "100%",
      color: theme.palette.white.main,
      textAlign: "center",
      marginBottom: theme.spacing(2)
    },
    "& .avatar": {
      width: theme.spacing(12),
      height: theme.spacing(12),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    },
    "& .left-caption": {
      color: theme.palette.white.main,
      textAlign: "center"
    }
  },
  RightPart: {
    padding: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${destopWidth})`
    },
    "& .right-title": {
      textAlign: "center",
      margin: `${theme.spacing(2)}px 0px`,
      display: "block"
    }
  },
  MainContentBox: {
    "& .list": {
      width: "100%",
      padding: 0,
      position: "relative",
      zIndex: 1
    },
    "& .list-item": {
      padding: 0,
      "& .avatar": {
        backgroundColor: theme.palette.primary.main
      },
      "& .lesson-name": {
        margin: `0px ${theme.spacing(1)}px`,
        display: "inline-block"
      }
    },
    "& .divider": {
      margin: `${theme.spacing(2)}px 0px`,
      height: '3px'
    },
  }
}));

export default function TestVocaBody({ }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { id, number, resources } = useSelector(state => state.testVoca);
  const { list } = useSelector(state => state.setVocas);

  const renderContentTestBox = (key, listValue = []) => {
    if (key !== LEVEL.MV) {
      return listValue.map(el => (
        <Typography key={el} color="textSecondary"
          className="lesson-name">
          {"Bai-" + el}
        </Typography>)
      )
    } else {
      return listValue.map(el => (
        <Typography key={el} color="textSecondary"
          className="lesson-name">
          {list.find(voca => voca.id === el)?.setName}
        </Typography>)
      )
    }
  }
  const handleGoToCheckVoca = () => {
    navigate(appUrl.testVoca().url + "/" + id);
  }

  React.useEffect(() => {
    // get new my-set-vocas:
    user.id && dispatch(serviceGetSetVocas(user.id));
    user.id && dispatch(serviceGetTestVocaByOwnerId(user.id));
  }, []);
  let hideDivider = null;
  return <BodyTop>
    <div className={classes.root} >
      <TitleBody>Chỉnh sửa nội dung bài kiểm tra</TitleBody>
      <Card className={classes.Card} >
        <Box className={classes.LeftPart} >
          <Typography variant="h5" className="left-title">Hộp kí ức</Typography>

          <ActionsBtnGroup center>
            <Avatar className="avatar" src="/image/cat-heart.png" ></Avatar>
          </ActionsBtnGroup>
          <DividerItem />

          <Typography className="left-caption">Học là quá trình nhớ và quên...</Typography>
          <ActionsBtnGroup center>
            <Button onClick={() => handleGoToCheckVoca()} color="primary" variant="contained" >Start Testing</Button>
          </ActionsBtnGroup>
        </Box>

        <Box className={classes.RightPart} >
          <Typography variant="h4" className="right-title" >練習</Typography>
          <div className={classes.MainContentBox} >
            <List className="list">
              {/* SO LUONG */}
              <ListItem className="list-item" >
                <TitleBody style={{ textAlign: "center" }}>Số lượng</TitleBody>
              </ListItem>
              <ListItem className="list-item" >
                <ListItemText>
                  <Typography style={{ textAlign: "center" }} variant="h6" color="primary" >
                    {number}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DividerItem />
              <DividerItem />
              {/* RESOURCES */}
              <ListItem className="list-item" >
                <TitleBody style={{ textAlign: "center" }} >Nội dung</TitleBody>
              </ListItem>
              {/* render list resources */}
              {Object.keys(resources)
                .map((key) => {
                  const { active, value } = resources[key];
                  if (!active || value.length === 0) return null;
                  if (hideDivider === null) hideDivider = key;
                  return <React.Fragment key={key} >
                    {hideDivider !== key && <DividerItem isHasLine />}
                    <ListItem className="list-item" >
                      <ListItemAvatar>
                        <Avatar className="avatar" >{key !== LEVEL.MV ? key : "自"}</Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        {renderContentTestBox(key, value)}
                      </ListItemText>
                    </ListItem>
                  </React.Fragment>
                })}
            </List>
            <ActionsBtnGroup center>
              <Button variant="contained" color="primary" onClick={() => dispatch(actionSetIsShowModal(true))} >
                <Typography>Edit</Typography>
              </Button>
            </ActionsBtnGroup>
          </div>
        </Box>
      </Card >
    </div>
  </BodyTop>
}