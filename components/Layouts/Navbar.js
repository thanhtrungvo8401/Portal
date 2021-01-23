import {
  AppBar,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import PropTypes from "prop-types";
function HideOnScroll(props) {
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

function Navbar(props) {
  return (
    <HideOnScroll {...props}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Scroll to Hide App Bar</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;
