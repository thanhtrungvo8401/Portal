import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MyLink from "components/atoms/my-link";
import { navigate, removeGmailTag } from "utils/Helper";
import { appUrl } from "utils/APP_URL";
import theme from "components/theme";

export const useStyles = makeStyles((theme) => {
  return {
    myLink: {
      width: "100%",
    },
    avatarLink: {
      justifyContent: "center",
    },
    responsiveUserInfo: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  };
});

export function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export const ProfileMenuPopup = (props) => {
  const classes = useStyles();
  return (
    <Menu
      anchorEl={props.anchorProfileEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.profileId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={props.isProfileMenuOpen}
      onClose={props.handleProfileMenuClose}
    >
      <MenuItem
        className={classes.responsiveUserInfo}
        onClick={props.handleProfileMenuClose}
      >
        {removeGmailTag(props.user && props.user.email)}
      </MenuItem>
      <MenuItem onClick={props.handleProfileMenuClose}>My profile</MenuItem>
      <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
    </Menu>
  );
};

export const MobileMenuPopup = (props) => {
  const classes = useStyles();
  return (
    <Menu
      className={props.className}
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={props.isMobileMenuOpen}
      onClose={props.handleMobileMenuClose}
    >
      <MenuItem
        className={classes.avatarLink}
        onClick={() => {
          navigate(appUrl.dashboard().url);
          props.handleMobileMenuClose();
        }}
      >
        <Avatar alt="avatar" src="/image/cat.png" />
      </MenuItem>
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink
          isNav={true}
          url={appUrl.dashboard().url}
          className={`${classes.myLink}`}
        >
          <span>{appUrl.dashboard().title}</span>
        </MyLink>
      </MenuItem>
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink isNav={true} url={appUrl.rememberVoca().url} className={classes.myLink}>
          {appUrl.rememberVoca().title}
        </MyLink>
      </MenuItem>
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink isNav={true} url={appUrl.testVoca().url} className={classes.myLink}>
          {appUrl.testVoca().title}
        </MyLink>
      </MenuItem>
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink isNav={true} url={appUrl.myVoca().url} className={classes.myLink}>
          {appUrl.myVoca().title}
        </MyLink>
      </MenuItem>
      <MenuItem className="close-btn">
        <IconButton onClick={props.handleMobileMenuClose}>
          <HighlightOffIcon
            style={{ color: theme.palette.white.main }}
            fontSize="large"
          />
        </IconButton>
      </MenuItem>
    </Menu>
  );
};
