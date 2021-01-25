import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import Link from "next/link";

export default function MyLink(props) {
  const { className, variant, url, children } = props;
  return (
    <Link component={Link} href={url}>
      <Typography className={className} variant={variant} noWrap>
        {children}
      </Typography>
    </Link>
  );
}

MyLink.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  className: PropTypes.any,
  url: PropTypes.string.isRequired,
};
