import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { navigate } from "../utils/Helper";

export default function MyLink(props) {
  const { className, variant, url, children } = props;
  const navigateToUrl = () => {
    navigate(url);
  };
  return (
    <Typography
      onClick={navigateToUrl}
      className={className}
      variant={variant}
      noWrap
    >
      {children}
    </Typography>
  );
}

MyLink.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  className: PropTypes.any,
  url: PropTypes.string.isRequired,
};