import {
  IconButton,
  Menu,
  MenuItem,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MyLink from "../MyLink";
import { removeGmailTag } from "../../utils/Helper";

export const useStyles = makeStyles((theme) => {
  return {
    grow: {
      flexGrow: 1,
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
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    mobileMenu: {
      backgroundColor: theme.palette.primary.main,
      "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-rounded": {
        width: "100%",
        height: "100%",
        maxHeight: "calc(100% - 32px)",
      },
      "& ul.MuiList-root.MuiMenu-list.MuiList-padding": {
        position: "relative",
        height: "100%",
        backgroundColor: theme.palette.primary.main,
      },
      "& .MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.close-btn.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button": {
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        left: 0,
        bottom: theme.spacing(4),
      },
    },
    myLink: {
      width: "100%",
    },
    roomEnter: {
      marginRight: theme.spacing(2),
      "& .MuiTypography-root.MuiTypography-h6.MuiTypography-noWrap": {
        overflow: "visible",
      },
    },
    responsiveUserInfo: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    responsiveUserInfoDesktop: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        display: "none",
        marginRight: 0,
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
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink
          variant="h6"
          url="/"
          color="secondary"
          className={classes.myLink}
        >
          Neko-kun
        </MyLink>
      </MenuItem>
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink
          variant="h6"
          url="/top-student"
          color="secondary"
          className={classes.myLink}
        >
          Top Student
        </MyLink>
      </MenuItem>
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink
          variant="h6"
          url="/top-student"
          color="secondary"
          className={classes.myLink}
        >
          News
        </MyLink>
      </MenuItem>
      <MenuItem onClick={props.handleMobileMenuClose}>
        <MyLink
          variant="h6"
          url="/top-student"
          color="secondary"
          className={classes.myLink}
        >
          About Neko
        </MyLink>
      </MenuItem>
      <MenuItem className="close-btn">
        <IconButton onClick={props.handleMobileMenuClose}>
          <HighlightOffIcon color={"secondary"} fontSize="large" />
        </IconButton>
      </MenuItem>
    </Menu>
  );
};
