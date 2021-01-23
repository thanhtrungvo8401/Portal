import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useState } from "react";
import { AccountCircle } from "@material-ui/icons";
import {
  useStyles,
  HideOnScroll,
  renderMenuF,
  renderMobileMenuF,
} from "./NavbarHelper";
function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = renderMenuF({
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    menuId,
  });

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = renderMobileMenuF({
    mobileMoreAnchorEl,
    mobileMenuId,
    isMobileMenuOpen,
    handleMobileMenuOpen,
    handleMobileMenuClose,
  });

  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color={"inherit"}
              variant="h6"
            >
              <MenuIcon />
            </IconButton>

            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
}

export default Navbar;
