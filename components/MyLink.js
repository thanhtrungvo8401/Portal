import { makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { navigate } from "../utils/Helper";

const useStyles = makeStyles((theme) => {
  return {
    link: {
      alignItems: "center",
      display: "flex",
      cursor: "pointer",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      "&:hover": {
        transition: theme.transitions.create("all", {
          duration: theme.transitions.duration.short,
        }),
        color: theme.palette.primary.main,
        backgroundColor: "rgba(52, 58, 64, 0.04)"
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
      color={color || "textPrimary"}
    >
      {children}
      {/* <div style={{ position: "relative", display: "inline-block" }}>
        <span>{children}</span>
        <span
          style={{
            position: "absolute",
            width: "100%",
            height: "2px",
            backgroundColor: "#212529",
            bottom: 0,
          }}
        ></span>
      </div> */}
    </Typography>
  );
}

MyLink.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.any,
  url: PropTypes.string,
};
