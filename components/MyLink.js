import { makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { navigate } from "../utils/Helper";

const useStyles = makeStyles((theme) => {
  return {
    link: {
      cursor: "pointer",
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
      variant={variant}
      noWrap
      color={color || "secondary"}
    >
      {children}
    </Typography>
  );
}

MyLink.propTypes = {
  children: PropTypes.any.isRequired,
  variant: PropTypes.string.isRequired,
  className: PropTypes.any,
  url: PropTypes.string,
};
