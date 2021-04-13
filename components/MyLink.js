import { makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { navigate } from "../utils/Helper";

const useStyles = makeStyles((theme) => {
  return {
    link: {
      alignItems: "center",
      display: "flex",
      cursor: "pointer",
      borderRadius: "0.5rem",
      color: theme.palette.primary.main,
      "&:hover": {
        transition: theme.transitions.create("all", {
          duration: theme.transitions.duration.short,
        }),
        color: theme.palette.text.primary,
      },
    },
    navLink: {
      alignItems: "center",
      display: "flex",
      cursor: "pointer",
      borderRadius: "0.5rem",
      color: theme.palette.white.main,
      "&:hover": {
        transition: theme.transitions.create("all", {
          duration: theme.transitions.duration.short,
        }),
        color: theme.palette.warning.main,
      },
    },
  };
});

export default function MyLink({ className, variant, url, children, isNav }) {
  const classes = useStyles();
  const navigateToUrl = () => {
    if (Boolean(url)) {
      navigate(url);
    }
  };
  return (
    <Typography
      onClick={navigateToUrl}
      className={`${className} ${isNav ? classes.navLink : classes.link}`}
      variant={variant || "body1"}
      noWrap
    >
      {children}
    </Typography>
  );
}

MyLink.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.any,
  url: PropTypes.string,
};
