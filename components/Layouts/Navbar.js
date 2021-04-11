import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import {
  HideOnScroll,
  MobileMenuPopup,
  ProfileMenuPopup,
} from "./NavbarHelper";
import MyLink from "../MyLink";
import styles from "./styles.module.css";
import { navigate, removeGmailTag, showLoginForm } from "../../utils/Helper";
import Login from "../../container/Login";
import { useDispatch, useSelector } from "react-redux";
import { serviceLogout } from "../../service/authenticate";
import { appUrl } from "../../utils/APP_URL";
import { localStorageHelper } from "../../utils/storageHelper";
import { storageKey } from "../../utils/Constant";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: theme.palette.info.main,
  },
  title: {
    display: "none",
    cursor: "pointer",
    marginRight: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  navItem: {
    cursor: "pointer",
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    marginLeft: "-12px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobileMenu: {
    backgroundColor: theme.palette.info.main,
    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-rounded": {
      width: "100%",
      height: "100%",
      maxHeight: "calc(100% - 32px)",
    },
    "& ul.MuiList-root.MuiMenu-list.MuiList-padding": {
      position: "relative",
      height: "100%",
      backgroundColor: theme.palette.info.main,
    },
    "& .MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.close-btn.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button": {
      justifyContent: "center",
      position: "absolute",
      width: "100%",
      left: 0,
      bottom: theme.spacing(4),
    },
  },
  loginBtn: {
    marginLeft: theme.spacing(2),
  },
  responsiveUserInfoDesktop: {
    marginLeft: theme.spacing(2),
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      marginRight: 0,
    },
  },
}));

function Navbar(props) {
  // VARIABLES:
  const classes = useStyles();
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE));
  const isProfileMenuOpen = Boolean(anchorProfileEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const _isLogined = useSelector(
    (state) => state.login && state.login.isLogined
  );
  // UI INTERACT
  const handleProfileMenuOpen = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorProfileEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(serviceLogout(handleProfileMenuClose));
  };
  const profileId = "profile-menu-popup";

  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.navbar}>
          <Container>
            <Toolbar>
              <Avatar
                alt="avatar"
                src="/image/cat.png"
                className={classes.title}
                onClick={() => {
                  navigate(appUrl.dashboard());
                }}
              />

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="default"
                >
                  <MenuIcon color="secondary" />
                </IconButton>
              </div>

              <div className={classes.sectionDesktop}>
                <MyLink className={classes.navItem} url="/top-student">
                  Top Student
                </MyLink>
                <MyLink className={classes.navItem} url="/top-student">
                  News
                </MyLink>
                <MyLink className={classes.navItem} url="/top-student">
                  About Neko
                </MyLink>
              </div>

              <div style={{ flexGrow: 1 }} />

              <MyLink
                className={styles.flashEffect}
                onClick={() => {
                  navigate(appUrl.studyRoom());
                }}
              >
                STUDY NOW
              </MyLink>

              {_isLogined && (
                <React.Fragment>
                  <Typography
                    className={classes.responsiveUserInfoDesktop}
                    variant="caption"
                    onClick={handleProfileMenuOpen}
                    color="textPrimary"
                  >
                    {removeGmailTag(user && user.email)}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={profileId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="secondary"
                  >
                    <AccountCircle color="secondary" />
                  </IconButton>
                </React.Fragment>
              )}
              {!_isLogined && (
                <div
                  onClick={() => showLoginForm()}
                  className={classes.loginBtn}
                >
                  <MyLink className={classes.navItem}>Login</MyLink>
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <ProfileMenuPopup
        anchorProfileEl={anchorProfileEl}
        isProfileMenuOpen={isProfileMenuOpen}
        handleProfileMenuClose={handleProfileMenuClose}
        handleLogout={handleLogout}
        profileId={profileId}
        user={user}
      />
      <MobileMenuPopup
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        mobileMenuId={mobileMenuId}
        className={classes.mobileMenu}
      />
      <Login />
    </React.Fragment>
  );
}

export default Navbar;
