import { Avatar, Box, Button, Card, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { theme } from "../../components/theme";
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import { constantApp } from "../../utils/Constant";
import React from "react";
import TestVocaModal from "../TestVocaModal/TestVocaModal";
import { useDispatch } from "react-redux";
import { actionSetIsShowModal } from "../../redux/actions/testVocaActions";

const destopWidth = "10rem";
const animationDuration = constantApp.animationDuration;

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
      </Box>
      <Box className={classes.RightPart} >
        <Typography variant="h4" component="label" className="right-title" >
          練習
      </Typography>
        <Box className={classes.MainContentBox} >
          <List className="list">
            <ListItem className="list-item" >
              <ListItemAvatar>
                <Avatar className="avatar" >50</Avatar>
              </ListItemAvatar>
              <ListItemText>
                Số lượng từ vựng bạn sẽ học từ những bài bên dưới
            </ListItemText>
            </ListItem>

            <Divider className='divider' />
            <ListItem className="list-item" >
              <ListItemAvatar>
                <Avatar className="avatar" >N5</Avatar>
              </ListItemAvatar>
              <ListItemText>
                {[26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map(el => {
                  return <Typography key={el}
                    className="lesson-name">
                    {el}
                  </Typography>
                })}
              </ListItemText>
            </ListItem>

            <Divider className='divider' />
            <ListItem className="list-item" >
              <ListItemAvatar>
                <Avatar className="avatar" >
                  <FaceIcon />
                </Avatar>

              </ListItemAvatar>
              <ListItemText>
                Bai 26: Study with meomeo <br />
              Bai 27: You will be successfull! <br />
              Bai 28: Study with meomeo <br />
              </ListItemText>
            </ListItem>
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