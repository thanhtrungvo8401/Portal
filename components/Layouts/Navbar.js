import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import {
  useStyles,
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
function Navbar(props) {
  // VARIABLES:
  const classes = useStyles();
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
        <AppBar color="primary">
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
                  <MenuIcon />
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

              <div className={classes.grow} />

              <Button
                color="default"
                variant="outlined"
                className={styles.flashEffect}
                size="medium"
                onClick={() => {
                  navigate(appUrl.studyRoom());
                }}
              >
                STUDY NOW
              </Button>

              {_isLogined && (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={profileId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="default"
                >
                  <Typography
                    className={classes.responsiveUserInfoDesktop}
                    variant="caption"
                  >
                    {removeGmailTag(user && user.email)}
                  </Typography>
                  <AccountCircle />
                </IconButton>
              )}
              {!_isLogined && (
                <div onClick={() => showLoginForm()}>
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
