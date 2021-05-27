import { Avatar, Box, Button, Card, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { theme } from "../../components/theme";
import EditIcon from '@material-ui/icons/Edit';
import { LEVEL, storageKey } from "../../utils/Constant";
import React from "react";
import TestVocaModal from "../TestVocaModal/TestVocaModal";
import { useDispatch, useSelector } from "react-redux";
import { actionSetIsShowModal } from "../../redux/actions/testVocaActions";
import { serviceGetSetVocas } from "../../service/setVocaService";
import { serviceGetTestVocaByOwnerId } from "../../service/testVocaService";
import { localStorageHelper } from "../../utils/storageHelper";
import { navigate } from "../../utils/Helper";
import { appUrl } from "../../utils/APP_URL";

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
      marginTop: theme.spacing(2),
      color: theme.palette.white.main,
      textIndent: theme.spacing(2)
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
    "& .divider-small": {
      margin: `${theme.spacing(1)}px 0px`,
    },
    "& .edit-line": {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      marginTop: theme.spacing(2),
      position: "relative",
      zIndex: 1
    },
  }
}));

export default function TestVocaBox({ }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { id, number, resources } = useSelector(state => state.testVoca);
  const { list } = useSelector(state => state.setVocas);

  React.useEffect(() => {
    // get new my-set-vocas:
    user.id && dispatch(serviceGetSetVocas(user.id));
    user.id && dispatch(serviceGetTestVocaByOwnerId(user.id));
  }, []);

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
    navigate(appUrl.testVoca() + "/" + id);
  }

  let hideDivider = null;
  return <React.Fragment>
    <Card className={classes.Card} >
      <Box className={classes.LeftPart} >
        <Typography
          variant="h5"
          className="left-title">
          Hộp kí ức
      </Typography>
        <div style={{ display: "flex", justifyContent: "center" }} >
          <Avatar className="avatar" src="/image/avatar_test_group.jpg" ></Avatar>
        </div>
        <Typography
          variant="body2"
          className="left-caption">
          Học là quá trình nhớ và quên...
      </Typography>
        <div style={{ display: "flex", justifyContent: "center" }} >
          <Button style={{
            marginTop: theme.spacing(2),
            marginLeft: "auto",
            marginRight: "auto"
          }}
            onClick={() => handleGoToCheckVoca()}
            color="primary" variant="contained" >
            Start Testing
        </Button>
        </div>
      </Box>
      <Box className={classes.RightPart} >
        <Typography variant="h4" component="label" className="right-title" >
          練習
      </Typography>
        <Box className={classes.MainContentBox} >
          <List className="list">
            {/* SO LUONG */}
            <ListItem className="list-item" >
              <ListItemAvatar><div></div></ListItemAvatar>
              <ListItemText>
                <Typography variant="h6" style={{ textAlign: "center" }} color="textSecondary" >Số lượng</Typography>
              </ListItemText>
            </ListItem>
            <ListItem className="list-item" >
              <ListItemAvatar>
                <Avatar className="avatar" >数</Avatar>
              </ListItemAvatar>
              <ListItemText>
                <Typography style={{ textAlign: "center" }} variant="h6" color="primary" >
                  {number}
                </Typography>
              </ListItemText>
            </ListItem>
            <Divider className='divider' />
            {/* RESOURCES */}
            <ListItem className="list-item" >
              <ListItemAvatar><div></div></ListItemAvatar>
              <ListItemText style={{ textAlign: "center" }} >
                <Typography variant="h6" style={{ textAlign: "center" }} color="textSecondary" >Nội dung</Typography>
              </ListItemText>
            </ListItem>
            {
              Object.keys(resources).map((key) => {
                const { active, value } = resources[key];
                if (!active || value.length === 0) return null;
                if (hideDivider === null) hideDivider = key;
                return <React.Fragment key={key} >
                  {hideDivider !== key && <Divider className='divider-small' />}
                  <ListItem className="list-item" >
                    <ListItemAvatar>
                      <Avatar className="avatar" >{key !== LEVEL.MV ? key : "自"}</Avatar>
                    </ListItemAvatar>
                    <ListItemText style={{ textAlign: "center" }} >
                      {renderContentTestBox(key, value)}
                    </ListItemText>
                  </ListItem>
                </React.Fragment>
              })
            }
          </List>
          <div className="edit-line" >
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(actionSetIsShowModal(true))}
            >
              <EditIcon
                style={{ fontSize: "1.5rem", marginRight: theme.spacing(1) }}
              />
              <Typography>Edit</Typography>
            </Button>
          </div>
        </Box>
      </Box>
    </Card >
    <TestVocaModal />
  </React.Fragment>
}