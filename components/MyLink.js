import { makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { navigate } from "../utils/Helper";

const useStyles = makeStyles((theme) => {
  return {
    link: {
      cursor: "pointer",
      "&:hover": {
        transition: theme.transitions.create("all", {
          duration: theme.transitions.duration.short,
        }),
        color: theme.palette.text.primary
      },
    },
  };
});

export default function MyLink(props) {
  const { className, variant, url, children, color } = props;
  const classes = useStyles();
  const navigateToUrl = () => {
    if (Boolean(url)) {
      navigate(url);
    }
  };
  return (
    <Typography
      onClick={navigateToUrl}
      className={`${className} ${classes.link}`}
      variant={variant || "body1"}
      noWrap
      color={color || "textSecondary"}
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
