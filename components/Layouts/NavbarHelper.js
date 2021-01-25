import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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
      <MenuItem>
        <Typography variant="h6" color="secondary">
          Fusi-kun
        </Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="h6" color="secondary">
          Top Student
        </Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="h6" color="secondary">
          News
        </Typography>
      </MenuItem>
      <MenuItem className="close-btn">
        <IconButton onClick={props.handleMobileMenuClose}>
          <HighlightOffIcon color={"secondary"} fontSize="large" />
        </IconButton>
      </MenuItem>
    </Menu>
  );
};
