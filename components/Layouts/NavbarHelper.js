import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { makeStyles, fade } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { AccountCircle } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => {
  return {
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
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

export const renderProfileMenuF = (props) => {
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
      <MenuItem onClick={props.handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={props.handleProfileMenuClose}>My account</MenuItem>
    </Menu>
  );
};

export const renderMobileMenuF = (props) => {
  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={props.isMobileMenuOpen}
      onClose={props.handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={props.handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
};
